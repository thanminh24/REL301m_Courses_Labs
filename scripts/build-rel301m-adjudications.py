#!/usr/bin/env python3
"""Build explicit per-question editorial decisions from reviewed local evidence."""

from __future__ import annotations

import json

from rel301m_guide_common import (
    ADJUDICATIONS,
    EXPECTED_QUESTION_IDS,
    PRIMARY_EVIDENCE_MAP,
    QUESTION_RECORDS,
    load_json,
)


VERIFY_ACCEPTABLE = {
    "Q104", "Q212", "Q226", "Q248", "Q255", "Q279",
}
VERIFY_INCORRECT = {
    "Q014", "Q030", "Q032", "Q041", "Q051", "Q063", "Q119", "Q122",
    "Q202", "Q230", "Q313",
}
VERIFY_UNSUPPORTED = {
    "Q002", "Q010", "Q015", "Q019", "Q028", "Q047", "Q048", "Q064",
    "Q074", "Q078", "Q080", "Q091", "Q109", "Q115", "Q145", "Q151",
    "Q152", "Q171", "Q177", "Q188", "Q224", "Q229", "Q234", "Q246",
    "Q252", "Q256", "Q257", "Q267", "Q303", "Q311",
}
EXTRA_UNSUPPORTED = {
    "Q066": "The local decks do not compare the named algorithm families, so the NOT option is not slide-grounded.",
    "Q103": "The local softmax slides do not introduce a temperature parameter.",
    "Q114": "The local softmax slides do not introduce a temperature parameter.",
    "Q203": "The local decks do not establish one universal softmax exploration parameter in the form asked.",
    "Q225": "The slides motivate sampled gradients but do not establish the keyed step-size claim as the unique limitation.",
    "Q240": "The parameterized-policy slides list advantages, not a unique main challenge matching this item.",
    "Q294": "The Gaussian-policy slides do not enumerate the learning methods needed to answer this NOT question.",
}
EXACT_DUPLICATE_OVERRIDES = {
    "Q231": {
        "verdict": "incorrect",
        "correct_answer": "The defining advantage is online bootstrapping without waiting for a complete episode.",
        "why": "Like Q032, the supplied lower-compute claim is not the defining universal advantage supported by the TD slides.",
        "basis": "exact-duplicate reconciliation with Q032",
    },
    "Q295": {
        "verdict": "acceptable-with-caveat",
        "correct_answer": None,
        "why": "The approximator supplies the action-value estimates used by epsilon-greedy; it does not itself perform exploration.",
        "basis": "exact-duplicate reconciliation with Q137",
    },
    "Q283": {
        "verdict": "acceptable-with-caveat",
        "correct_answer": None,
        "why": "Averaging next-action values smooths the sampled target in the lecture comparison, but it is not a universal variance guarantee against Q-learning.",
        "basis": "exact-duplicate reconciliation with Q150",
    },
}


def supported_why(record: dict, caution: str, *, caveat: bool) -> str:
    answer = record["source"]["supplied_answer"]
    concept = record["normalized_concept"]
    lead = (
        f"The intended option is {answer['letter']} ({answer['text']}). "
        if caveat
        else f"Option {answer['letter']} ({answer['text']}) matches the local lecture evidence. "
    )
    detail = caution or f"The item checks {concept}."
    return lead + detail


def main() -> None:
    source = load_json(QUESTION_RECORDS)
    primary = load_json(PRIMARY_EVIDENCE_MAP)["records"]
    verify_ids = {
        record["question_id"]
        for record in source["records"]
        if record["source"]["quality"] == "verify"
    }
    classified = VERIFY_ACCEPTABLE | VERIFY_INCORRECT | VERIFY_UNSUPPORTED
    if classified != verify_ids:
        raise ValueError(
            f"verify adjudication mismatch; missing={sorted(verify_ids-classified)} "
            f"extra={sorted(classified-verify_ids)}"
        )
    output: dict[str, dict] = {}
    for record in source["records"]:
        qid = record["question_id"]
        item = record["source"]
        evidence = primary[qid]
        if evidence["primary_source_type"] == "question-bank":
            supplied = item["supplied_answer"]
            verdict, correction = "bank-key-only", None
            why = (
                f"This item is canonical because it appeared in tests. Learn the supplied "
                f"test-bank answer {supplied['letter']} ({supplied['text']}) for exam recall, "
                "but do not treat it as reference-verified: no answer-enabling passage was "
                "found in the local slides, Sutton–Barto book, or official public Coursera pages."
            )
            basis = "canonical tested bank; no answer-enabling reference support"
        elif evidence["primary_source_type"] in {"book", "coursera-public"}:
            verdict = evidence["recommended_verdict"]
            correction = (
                evidence["reference_answer"] if verdict == "incorrect" else None
            )
            source_label = (
                "Sutton–Barto"
                if evidence["primary_source_type"] == "book"
                else "the official public Coursera course page"
            )
            support = evidence["supplied_answer_support"]
            support_phrase = {
                "supported": "supports",
                "contradicted": "contradicts",
                "ambiguous": "does not uniquely resolve",
            }[support]
            why = (
                f"{source_label} evidence {support_phrase} the supplied key. "
                f"{evidence['caution']} Reference answer: "
                f"{evidence['reference_answer']}"
            )
            basis = f"{evidence['primary_source_type']} supplemental evidence"
        else:
            caution = evidence["caution"]
            unsupported = (
                evidence["confidence"] == "C"
                or qid in VERIFY_UNSUPPORTED
                or qid in EXTRA_UNSUPPORTED
            )
            if unsupported:
                supplied = item["supplied_answer"]
                verdict = "bank-key-only"
                correction = None
                gap = EXTRA_UNSUPPORTED.get(qid) or caution or item.get("audit_note")
                why = (
                    f"Learn the supplied test-bank answer {supplied['letter']} "
                    f"({supplied['text']}) for exam recall. Local lecture evidence does not "
                    f"establish it as the unique conceptual answer. {gap}"
                )
                basis = "canonical tested bank; limited local evidence"
            elif qid in VERIFY_INCORRECT:
                verdict = "incorrect"
                correction = "The supplied key is contradicted by the local lecture correction below."
                why = item["audit_note"]
                basis = "explicit correction"
            elif qid in VERIFY_ACCEPTABLE:
                verdict = "acceptable-with-caveat"
                correction = None
                why = item["audit_note"]
                basis = "supported only with stated caveat"
            elif item["quality"] == "review":
                verdict = "acceptable-with-caveat"
                correction = None
                why = supported_why(record, caution, caveat=True)
                basis = "reviewed mapped evidence"
            else:
                verdict = "correct"
                correction = None
                why = supported_why(record, caution, caveat=False)
                basis = "direct mapped evidence"
        if not why:
            raise ValueError(f"{qid}: adjudication lacks rationale")
        decision = {
            "verdict": verdict,
            "correct_answer": correction,
            "why": why,
            "basis": basis,
            "source_quality": item["quality"],
            "duplicate_cluster": record["duplicate_cluster"],
        }
        decision.update(EXACT_DUPLICATE_OVERRIDES.get(qid, {}))
        output[qid] = decision
    if list(output) != EXPECTED_QUESTION_IDS:
        raise ValueError("adjudication sequence mismatch")
    payload = {
        "generated": "2026-07-24",
        "authority": (
            "per-question adjudication using local slides, the local Sutton–Barto book, "
            "official public Coursera pages where answer-bearing, then the tested question bank"
        ),
        "counts": {
            verdict: sum(item["verdict"] == verdict for item in output.values())
            for verdict in sorted({item["verdict"] for item in output.values()})
        },
        "records": output,
    }
    ADJUDICATIONS.write_text(json.dumps(payload, indent=2, ensure_ascii=False) + "\n")
    print(f"Wrote {ADJUDICATIONS} with {len(output)} adjudications: {payload['counts']}")


if __name__ == "__main__":
    main()
