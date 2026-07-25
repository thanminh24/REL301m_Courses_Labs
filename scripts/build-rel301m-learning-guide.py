#!/usr/bin/env python3
"""Assemble the canonical REL301m study guide from reviewed local artifacts."""

from __future__ import annotations

import re
from collections import Counter, defaultdict

from pptx import Presentation

from rel301m_guide_common import (
    ADJUDICATIONS,
    GUIDE,
    PRIMARY_EVIDENCE_MAP,
    QUESTION_RECORDS,
    RESEARCH,
    SLIDES,
    lecture_anchor,
    load_json,
)
from rel301m_guide_questions import question_entry


def fragment(name: str) -> str:
    """Read a research fragment and rebase its docs links for the final docs/ file."""
    return (
        (RESEARCH / name)
        .read_text()
        .replace("../../../docs/", "")
        .replace("**Mapped questions:**", "**Demand and related practice:**")
        .replace("**Mapped question:**", "**Demand and related practice:**")
    )


def apply_final_mappings(records: list[dict]) -> None:
    final = load_json(PRIMARY_EVIDENCE_MAP)["records"]
    adjudications = load_json(ADJUDICATIONS)["records"]
    for record in records:
        mapped = final[record["question_id"]]
        if record["mapping"] is None:
            record["mapping"] = {}
        record["mapping"].update(mapped)
        record["mapping"]["mapping_confidence"] = mapped["confidence"]
        record["normalized_concept"] = mapped["normalized_concept"]
        record["provisional_concept_depth"] = mapped["depth"]
        record["adjudication"] = adjudications[record["question_id"]]


def table_of_contents() -> str:
    lines = [
        "## Table of contents",
        "",
        "- [Start here](#start-here)",
        "- [How to learn](#how-to-learn)",
        "- [Whole-course mental model](#whole-course-mental-model)",
        "- [Notation and formula interpretation](#notation-glossary)",
        "- [Cross-course comparisons](#cross-course-comparisons)",
        "- [Common confusions](#common-confusions)",
        "- [Local lecture source coverage](#source-coverage)",
        "- [Course introduction](#course-introduction)",
    ]
    for course, end in ((1, 12), (2, 13), (3, 12)):
        lines.append(f"- Course {course}")
        for lecture in range(1, end + 1):
            lines.append(f"  - [Lecture {course}.{lecture}](#lecture-{course}-{lecture})")
        lines.append(f"  - [Course {course} cheat sheet](#course-{course}-cheat-sheet)")
    lines.extend([
        "- [Final course review](#course-review)",
        "- [Question navigation](#question-navigation)",
        "- [Canonical source supplements](#canonical-source-supplements)",
        "- [Full Q001–Q317 bank](#full-question-bank)",
        "",
    ])
    return "\n".join(lines)


def question_links(records: list[dict]) -> str:
    grouped: dict[str, list[str]] = defaultdict(list)
    for record in records:
        mapping = record["mapping"]
        deck = mapping.get("primary_lecture") or mapping.get("related_lecture")
        if deck:
            grouped[deck].append(record["question_id"])
    lines = [
        "<a id=\"question-navigation\"></a>",
        "## Question navigation by learning context",
        "",
        "This is the authoritative context index. A question may use a book passage as its "
        "answer-bearing evidence while retaining the closest local lecture for revision.",
        "",
        "**Editorial outcomes:** "
        + "; ".join(
            f"{count} {verdict}"
            for verdict, count in sorted(
                Counter(r["adjudication"]["verdict"] for r in records).items()
            )
        )
        + ". Every item is canonical exam material. `bank-key-only` means learn the supplied "
        "answer for test recall while keeping its limited lecture support visible.",
        "",
    ]
    for deck in sorted(grouped, key=lambda value: [int(x) for x in re.findall(r"\d+", value)[:2]]):
        ids = grouped[deck]
        links = ", ".join(f"[{qid}](#{qid.lower()})" for qid in ids)
        lines.extend([f"- [{deck}](#{lecture_anchor(deck)}): {links}", ""])
    lines.extend([
        '<a id="canonical-source-supplements"></a>',
        "### Canonical source supplements",
        "",
        "**Sutton–Barto-supported questions:** "
        + ", ".join(
            f"[{r['question_id']}](#{r['question_id'].lower()})"
            for r in records
            if r["mapping"]["primary_source_type"] == "book"
        ),
        "",
        "**Official-public-Coursera-supported questions:** "
        + (
            ", ".join(
                f"[{r['question_id']}](#{r['question_id'].lower()})"
                for r in records
                if r["mapping"]["primary_source_type"] == "coursera-public"
            )
            or "none — public pages confirmed the curriculum but did not uniquely answer an "
            "additional question"
        ),
        "",
        "**Bank-key-only questions:** These remain required because they appeared in tests. "
        "The supplied answer is retained for exam recall, but no answer-enabling passage was "
        "found in the local slides, Sutton–Barto book, or official public Coursera pages: "
        + ", ".join(
            f"[{r['question_id']}](#{r['question_id'].lower()})"
            for r in records
            if r["mapping"]["primary_source_type"] == "question-bank"
        ),
        "",
    ])
    return "\n".join(lines)


def source_matrix(records: list[dict]) -> str:
    demand = Counter(
        r["mapping"].get("primary_lecture") or r["mapping"].get("related_lecture")
        for r in records
        if r["mapping"].get("primary_lecture") or r["mapping"].get("related_lecture")
    )
    depths: dict[str, list[str]] = defaultdict(list)
    for record in records:
        deck = (
            record["mapping"].get("primary_lecture")
            or record["mapping"].get("related_lecture")
        )
        if deck:
            depths[deck].append(
                record["provisional_concept_depth"]
            )
    rank = {"D0": 0, "D1": 1, "D2": 2, "D3": 3}
    lines = [
        "<a id=\"source-coverage\"></a>",
        "## Local lecture source coverage",
        "",
        "All 39 local decks are represented. The 37 `.pptx` decks contain 713 slides. "
        "The two legacy `.ppt` decks are retained as framing sources; their binary format "
        "does not expose a reliable slide count with the available local tools.",
        "",
        "| Deck | Slides | Question contexts | Depth |",
        "|---|---:|---:|---|",
    ]
    total = 0
    for deck in sorted(SLIDES.iterdir(), key=lambda p: [int(x) for x in re.findall(r"\d+", p.name)[:2]]):
        if deck.suffix.lower() == ".pptx":
            count = len(Presentation(deck).slides)
            total += count
            slide_text = str(count)
        else:
            slide_text = "legacy"
        assigned = depths.get(deck.name, [])
        depth = max(assigned, key=lambda item: rank[item]) if assigned else "D0"
        lines.append(f"| `{deck.name}` | {slide_text} | {demand[deck.name]} | {depth} |")
    lines.extend(["", f"**Reconciled `.pptx` slide total:** {total}.", ""])
    return "\n".join(lines)


def supplemental_source_coverage(records: list[dict]) -> str:
    counts = Counter(record["mapping"]["primary_source_type"] for record in records)
    return (
        "## Supplemental reference coverage\n\n"
        f"- **Sutton–Barto book:** {counts['book']} questions use page-level evidence from "
        "[the local 548-page PDF](1-Reinforcement Learning-An introduction.pdf).\n"
        f"- **Official public Coursera pages:** {counts['coursera-public']} questions use a "
        "public page as direct answer evidence. The pages still confirm the course sequence: "
        "[Course 1](https://www.coursera.org/learn/fundamentals-of-reinforcement-learning), "
        "[Course 2](https://www.coursera.org/learn/sample-based-learning-methods), and "
        "[Course 3](https://www.coursera.org/learn/prediction-control-function-approximation).\n"
        f"- **Question bank only:** {counts['question-bank']} questions have no "
        "answer-enabling passage in the allowed references and remain visibly marked.\n\n"
        "No gated Coursera videos, transcripts, quizzes, or assignments were accessed."
    )


def main() -> None:
    data = load_json(QUESTION_RECORDS)
    records = data["records"]
    apply_final_mappings(records)
    source_counts = Counter(
        record["mapping"]["primary_source_type"] for record in records
    )
    framing = (RESEARCH / "course-framing-fragment.md").read_text()
    introduction, review = framing.split('<a id="course-review"></a>', maxsplit=1)
    sections = [
        fragment("manual-front-and-cross-course.md").rstrip(),
        table_of_contents().rstrip(),
        source_matrix(records).rstrip(),
        supplemental_source_coverage(records).rstrip(),
        introduction.rstrip(),
        fragment("course-1-learning-fragment.md").rstrip(),
        fragment("course-2-learning-fragment.md").rstrip(),
        fragment("course-3-learning-fragment.md").rstrip(),
        '<a id="course-review"></a>\n' + review.rstrip(),
        question_links(records).rstrip(),
        '<a id="full-question-bank"></a>\n## Full question bank — Q001–Q317\n\n'
        "Attempt each stem without looking at its options. Original content and the supplied key "
        "are preserved; the editorial fields tell you what is safe to learn.",
        "\n".join(question_entry(record) for record in records).rstrip(),
        "## Coverage and unresolved-source notes\n\n"
        "- 317/317 original records are canonical exam material and included once, in order.\n"
        f"- {source_counts['lecture']} questions use answer-bearing local slide evidence; "
        f"{source_counts['book']} use page-level Sutton–Barto evidence; "
        f"{source_counts['coursera-public']} use official public Coursera evidence; and "
        f"{source_counts['question-bank']} remain bank-key-only.\n"
        "- Questions promoted by the reference pass retain their closest lecture context when "
        "one exists and are visibly marked as book- rather than slide-supported.\n"
        "- 39/39 local decks represented; 713 slides counted across the 37 `.pptx` decks.\n"
        "- Legacy `.ppt` slide counts remain unavailable; their course-plan/review text is used "
        "only for framing.\n"
        "- Defective supplied keys may still resemble grading keys. This guide preserves them "
        "while teaching the strongest reference-grounded verdict available.",
    ]
    GUIDE.write_text("\n\n---\n\n".join(sections).rstrip() + "\n")
    print(f"Wrote {GUIDE} with {len(records)} questions.")


if __name__ == "__main__":
    main()
