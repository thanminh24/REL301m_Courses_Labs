#!/usr/bin/env python3
"""Promote every tested REL301m question to canon without inventing slide support."""

from __future__ import annotations

import json
import re

from rel301m_guide_common import EXPECTED_QUESTION_IDS, QUESTION_RECORDS, load_json


def infer_bank_only_concept(stem: str) -> str:
    """Return a concise searchable concept label for a question lacking a lecture map."""
    lowered = stem.lower()
    labels = (
        ("monte-carlo tree search", ("monte-carlo tree search", "mcts")),
        ("temporal-difference learning claims", ("temporal difference",)),
        ("discrimination and generalization", ("discrimination", "generalization")),
        ("hyperbolic discounting", ("hyperbolic discounting",)),
        ("habit and episodic-task learning", ("habit", "episodic task")),
        ("reward schedules and shaping", ("reward", "shaping")),
        ("gradient estimation", ("gradient", "step size (h)")),
        ("overfitting", ("overfitting",)),
        ("Monte Carlo integration", ("high-dimensional integration", "monte carlo method")),
        ("eligibility traces", ("eligibility trace",)),
        ("exploration", ("exploration",)),
        ("star-exploration decision making", ("star exploration", "explore stars")),
    )
    for label, keywords in labels:
        if any(keyword in lowered for keyword in keywords):
            return label
    cleaned = re.sub(r"^(what|which|why|how|when|in an experiment),?\s+", "", stem)
    return cleaned.rstrip("?").strip()


def main() -> None:
    data = load_json(QUESTION_RECORDS)
    records = data["records"]
    if [record["question_id"] for record in records] != EXPECTED_QUESTION_IDS:
        raise ValueError("question sequence mismatch")

    for record in records:
        previous = record.get("scope_status", "canonical")
        if "lecture_support_status" not in record:
            record["legacy_scope_status"] = previous
            record["legacy_scope_note"] = record.get("quarantine_reason")
            record["lecture_support_status"] = (
                "lecture-mapped" if previous == "canonical" else "bank-only"
            )
        record["exam_status"] = "canonical"
        record["scope_status"] = "canonical"
        record["quarantine_reason"] = None
        if record["lecture_support_status"] == "bank-only":
            record["normalized_concept"] = (
                record.get("normalized_concept")
                or infer_bank_only_concept(record["source"]["stem"])
            )
            record["provisional_concept_depth"] = "D1"
            record["editorial"]["verdict"] = "pending-bank-only-adjudication"

    data["schema_version"] = "1.1"
    data["source_boundary"] = (
        "All 317 questions appeared in tests and are canonical exam material. "
        "Lecture-support status is tracked separately."
    )
    data["counts"] = {
        "total_records": len(records),
        "canonical": len(records),
        "lecture_mapped": sum(
            record["lecture_support_status"] == "lecture-mapped" for record in records
        ),
        "bank_only": sum(
            record["lecture_support_status"] == "bank-only" for record in records
        ),
        "exact_duplicate_clusters": sum(
            cluster["kind"] == "exact" for cluster in data["duplicate_clusters"]
        ),
        "near_duplicate_clusters": sum(
            cluster["kind"] == "near" for cluster in data["duplicate_clusters"]
        ),
    }
    QUESTION_RECORDS.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n")
    print(
        f"Wrote {QUESTION_RECORDS}: {data['counts']['canonical']} canonical; "
        f"{data['counts']['lecture_mapped']} lecture-mapped; "
        f"{data['counts']['bank_only']} bank-only."
    )


if __name__ == "__main__":
    main()
