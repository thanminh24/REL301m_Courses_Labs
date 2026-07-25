"""Render editorial question entries for the REL301m learning guide."""

from __future__ import annotations

from rel301m_guide_common import lecture_anchor


def editorial_fields(record: dict) -> tuple[str, str | None, str]:
    adjudication = record["adjudication"]
    return (
        adjudication["verdict"],
        adjudication["correct_answer"],
        adjudication["why"],
    )


def question_entry(record: dict) -> str:
    source = record["source"]
    qid = record["question_id"]
    verdict, correction, why = editorial_fields(record)
    mapping = record.get("mapping") or {}
    deck = mapping.get("primary_lecture")
    slides = mapping.get("primary_slides")
    source_type = mapping.get("primary_source_type")
    anchor = lecture_anchor(deck)
    lines = [
        f'<a id="{qid.lower()}"></a>',
        f"### {qid} — `{source['module_tag']}` · {verdict}",
        "",
        source["stem"],
        "",
    ]
    lines.extend(f"- **{letter}.** {source['options'][letter]}" for letter in "ABCD")
    lines.extend([
        "",
        f"**Supplied answer:** {source['supplied_answer']['letter']}. "
        f"{source['supplied_answer']['text']}",
        f"**Learning verdict:** {verdict}",
    ])
    if correction:
        lines.append(f"**Correct answer:** {correction}")
    lines.append(f"**Why:** {why}")
    if source_type == "lecture":
        label = (
            "**Closest lecture context:**"
            if verdict == "bank-key-only"
            else "**Primary lecture:**"
        )
        lines.extend([
            f"{label} [{deck}](#{anchor}), slides {slides}",
            f"**Related concept:** {record['normalized_concept']}",
            f"**Mapping confidence:** {record['mapping']['mapping_confidence']}",
        ])
    elif source_type == "book":
        locator = mapping["source_locator"]
        pages = ", ".join(str(page) for page in locator["printed_pages"])
        lines.extend([
            f"**Primary evidence:** [Sutton–Barto, *Reinforcement Learning: An "
            f"Introduction*]({locator['path']}), {locator['section']}, printed pp. {pages}",
            f"**Reference explanation:** {mapping['caution']}",
            f"**Evidence tier:** book-supported ({mapping['mapping_confidence'].lower()} "
            "confidence), distinct from local-slide support",
        ])
        related = mapping.get("related_lecture")
        if related:
            lines.append(
                f"**Closest lecture context:** [{related}](#{lecture_anchor(related)}), "
                f"slides {mapping['related_slides']}"
            )
        lines.append(f"**Related concept:** {record['normalized_concept']}")
    elif source_type == "coursera-public":
        locator = mapping["source_locator"]
        lines.extend([
            f"**Primary evidence:** [{locator['title']}]({locator['url']}), "
            f"{locator['section']}",
            f"**Reference explanation:** {mapping['caution']}",
            "**Evidence tier:** official public Coursera material, distinct from local-slide "
            "support",
            f"**Related concept:** {record['normalized_concept']}",
        ])
    else:
        lines.extend([
            "**Canonical source:** supplied question bank — this item appeared in tests",
            "**Reference support:** no answer-enabling passage in the local slides, "
            "Sutton–Barto book, or official public Coursera pages",
            f"**Related concept:** {record['normalized_concept']}",
            "**Evidence confidence:** BANK (exam-canonical, not lecture-verified)",
        ])
        related = mapping.get("related_lecture")
        if related:
            lines.append(
                f"**Closest lecture context:** [{related}](#{lecture_anchor(related)}), "
                f"slides {mapping['related_slides']}"
            )
    lines.extend(["", "[Back to question navigation](#question-navigation)", "", "---", ""])
    return "\n".join(lines)
