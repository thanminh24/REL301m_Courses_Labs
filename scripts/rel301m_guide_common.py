"""Shared paths and data helpers for the REL301m guide tooling."""

from __future__ import annotations

import json
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
RESEARCH = ROOT / "plans/260724-0949-rel301m-learning-materials/research"
SLIDES = ROOT / "docs/slides/slides"
GUIDE = ROOT / "docs/rel301m-complete-learning-guide.md"
QUESTION_RECORDS = RESEARCH / "question-records.json"
PRIMARY_EVIDENCE_MAP = RESEARCH / "primary-evidence-map.json"
SUPPLEMENTAL_EVIDENCE_MAP = RESEARCH / "supplemental-evidence-map.json"
ADJUDICATIONS = RESEARCH / "question-adjudications.json"
EXPECTED_QUESTION_IDS = [f"Q{i:03d}" for i in range(1, 318)]


def load_json(path: Path) -> dict:
    return json.loads(path.read_text())


def lecture_anchor(deck: str | None) -> str:
    if not deck:
        return "canonical-source-supplements"
    match = re.match(r"(\d+)\.(\d+)", deck)
    if match:
        return f"lecture-{match.group(1)}-{int(match.group(2))}"
    return "course-introduction" if deck.startswith("0.") else "course-review"
