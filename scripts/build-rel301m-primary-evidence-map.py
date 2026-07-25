#!/usr/bin/env python3
"""Generate the final one-primary-lecture map from course authoring evidence maps."""

from __future__ import annotations

import json
import re

from rel301m_guide_common import (
    EXPECTED_QUESTION_IDS,
    PRIMARY_EVIDENCE_MAP,
    QUESTION_RECORDS,
    RESEARCH,
    SLIDES,
    SUPPLEMENTAL_EVIDENCE_MAP,
    load_json,
)


def deck_for(lecture: str) -> str:
    pattern = re.compile(rf"^{re.escape(lecture)}(?:\.|\s)")
    matches = [path.name for path in SLIDES.iterdir() if pattern.match(path.name)]
    if len(matches) != 1:
        raise ValueError(f"{lecture}: expected one deck, found {matches}")
    return matches[0]


def row_cells(line: str) -> list[str]:
    return [cell.strip() for cell in line.strip().strip("|").split("|")]


def add_record(
    output: dict[str, dict],
    qid: str,
    concept: str,
    evidence: str,
    depth: str,
    confidence: str,
    caution: str,
    *,
    keep_first: bool = False,
) -> None:
    if keep_first and qid in output:
        return
    lecture, slides = evidence.split("/", 1)
    slides = slides.split(";", 1)[0].strip()
    output[qid] = {
        "primary_source_type": "lecture",
        "primary_lecture": deck_for(lecture),
        "primary_slides": slides,
        "related_lecture": None,
        "related_slides": None,
        "normalized_concept": concept,
        "depth": depth,
        "confidence": (
            "A"
            if confidence == "A" or confidence.startswith("High")
            else "B"
            if confidence == "B" or confidence.startswith("Medium")
            else "C"
        ),
        "caution": caution,
    }


def parse_course_1(output: dict[str, dict]) -> None:
    text = (RESEARCH / "course-1-evidence-map.md").read_text()
    for line in text.splitlines():
        if not re.match(r"^\| Q\d{3} \|", line):
            continue
        qid, concept, evidence, depth, confidence, caution = row_cells(line)
        add_record(output, qid, concept, evidence, depth, confidence, caution)


def parse_course_2(output: dict[str, dict]) -> None:
    text = (RESEARCH / "course-2-evidence-map.md").read_text()
    for line in text.splitlines():
        if not re.match(r"^\| Q\d{3}", line):
            continue
        ids, concept, evidence, _mode, depth, confidence, caution = row_cells(line)
        for qid in re.findall(r"Q\d{3}", ids):
            add_record(output, qid, concept, evidence, depth, confidence, caution)


def parse_course_3(output: dict[str, dict]) -> None:
    text = (RESEARCH / "course-3-evidence-map.md").read_text()
    for line in text.splitlines():
        if not re.match(r"^\| 3\.\d+ \|", line):
            continue
        lecture, concept, slides, depth, ids, confidence = row_cells(line)
        caution = confidence.split(";", 1)[1].strip() if ";" in confidence else ""
        confidence_label = confidence.split(";", 1)[0].strip()
        for qid in re.findall(r"Q\d{3}", ids):
            add_record(
                output,
                qid,
                concept,
                f"{lecture}/{slides}",
                depth,
                confidence_label,
                caution,
                keep_first=True,
            )


def main() -> None:
    records: dict[str, dict] = {}
    parse_course_1(records)
    parse_course_2(records)
    parse_course_3(records)
    expected = set(EXPECTED_QUESTION_IDS)
    source = load_json(QUESTION_RECORDS)
    lecture_mapped = {
        record["question_id"]
        for record in source["records"]
        if record["lecture_support_status"] == "lecture-mapped"
    }
    if set(records) != lecture_mapped or len(records) != 274:
        raise ValueError(
            f"map mismatch: {len(records)} records; "
            f"missing {sorted(lecture_mapped-set(records))}; "
            f"extra {sorted(set(records)-expected)}"
        )
    for record in source["records"]:
        if record["lecture_support_status"] != "bank-only":
            continue
        records[record["question_id"]] = {
            "primary_source_type": "question-bank",
            "primary_lecture": None,
            "primary_slides": None,
            "related_lecture": None,
            "related_slides": None,
            "normalized_concept": record["normalized_concept"],
            "depth": "D1",
            "confidence": "BANK",
            "caution": (
                "Canonical because it appeared in tests; the local lecture decks do not "
                "provide an answer-enabling passage."
            ),
        }
    supplemental = load_json(SUPPLEMENTAL_EVIDENCE_MAP)
    supplemental_records = supplemental["records"]
    if len(supplemental_records) != 92:
        raise ValueError(
            f"supplemental map must cover 92 limited-evidence records, "
            f"found {len(supplemental_records)}"
        )
    for qid, evidence in supplemental_records.items():
        base = records[qid]
        source_type = evidence["source_type"]
        related_lecture = (
            base["primary_lecture"]
            if base["primary_source_type"] == "lecture"
            else None
        )
        related_slides = (
            base["primary_slides"]
            if base["primary_source_type"] == "lecture"
            else None
        )
        if source_type == "question-bank":
            records[qid] = {
                "primary_source_type": "question-bank",
                "primary_lecture": None,
                "primary_slides": None,
                "related_lecture": related_lecture,
                "related_slides": related_slides,
                "normalized_concept": base["normalized_concept"],
                "depth": base["depth"],
                "confidence": "BANK",
                "caution": evidence["reason"],
            }
            continue
        records[qid] = {
            "primary_source_type": source_type,
            "primary_lecture": None,
            "primary_slides": None,
            "related_lecture": related_lecture,
            "related_slides": related_slides,
            "normalized_concept": base["normalized_concept"],
            "depth": base["depth"],
            "confidence": evidence["confidence"].upper(),
            "caution": evidence["support"],
            "source_locator": {
                "title": "Reinforcement Learning: An Introduction (2nd ed.)",
                "path": "1-Reinforcement Learning-An introduction.pdf",
                "printed_pages": evidence["printed_pages"],
                "section": evidence["chapter_section"],
            },
            "reference_answer": evidence["reference_answer"],
            "recommended_verdict": evidence["recommended_verdict"],
            "supplied_answer_support": evidence["supplied_answer_support"],
        }
    if set(records) != expected or len(records) != 317:
        raise ValueError(
            f"complete canon mismatch: {len(records)} records; "
            f"missing {sorted(expected-set(records))}"
        )
    payload = {
        "generated": "2026-07-24",
        "authority": (
            "all tested questions are canonical; evidence priority is local slides, the local "
            "Sutton–Barto book, official public Coursera material, then the supplied question bank"
        ),
        "counts": {
            "canonical": len(records),
            "lecture": sum(
                item["primary_source_type"] == "lecture" for item in records.values()
            ),
            "book": sum(
                item["primary_source_type"] == "book" for item in records.values()
            ),
            "coursera_public": sum(
                item["primary_source_type"] == "coursera-public"
                for item in records.values()
            ),
            "bank_only": sum(
                item["primary_source_type"] == "question-bank"
                for item in records.values()
            ),
        },
        "records": dict(sorted(records.items())),
    }
    PRIMARY_EVIDENCE_MAP.write_text(
        json.dumps(payload, indent=2, ensure_ascii=False) + "\n"
    )
    print(f"Wrote {PRIMARY_EVIDENCE_MAP} with {len(records)} primary mappings.")


if __name__ == "__main__":
    main()
