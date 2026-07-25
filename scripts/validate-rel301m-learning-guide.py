#!/usr/bin/env python3
"""Validate structural contracts of the generated REL301m guide."""

from __future__ import annotations

import re

from pptx import Presentation

from rel301m_guide_common import (
    ADJUDICATIONS,
    EXPECTED_QUESTION_IDS,
    GUIDE,
    PRIMARY_EVIDENCE_MAP,
    QUESTION_RECORDS,
    SLIDES,
    load_json,
)


def main() -> None:
    text = GUIDE.read_text()
    data = load_json(QUESTION_RECORDS)
    primary = load_json(PRIMARY_EVIDENCE_MAP)
    adjudications = load_json(ADJUDICATIONS)
    errors: list[str] = []
    ids = re.findall(r"^### (Q\d{3}) —", text, re.MULTILINE)
    expected = EXPECTED_QUESTION_IDS
    if ids != expected:
        errors.append(f"question sequence mismatch: {len(ids)} headings")
    for qid in expected:
        if text.count(f'<a id="{qid.lower()}"></a>') != 1:
            errors.append(f"{qid}: anchor missing or duplicated")
    blocks = re.split(r'(?=<a id="q\d{3}"></a>)', text)
    question_blocks = [block for block in blocks if re.match(r'<a id="q\d{3}"></a>', block)]
    block_by_id = {
        re.search(r"### (Q\d{3})", block).group(1): block
        for block in question_blocks
    }
    for block in question_blocks:
        qid = re.search(r"### (Q\d{3})", block).group(1)
        if len(re.findall(r"^- \*\*[ABCD]\.\*\*", block, re.MULTILINE)) != 4:
            errors.append(f"{qid}: not four choices")
        for field in ("**Supplied answer:**", "**Learning verdict:**", "**Why:**"):
            if field not in block:
                errors.append(f"{qid}: missing {field}")
    canonical = sum(r["scope_status"] == "canonical" for r in data["records"])
    excluded = len(data["records"]) - canonical
    if canonical != 317 or excluded != 0:
        errors.append(f"record canon mismatch: {canonical}/{excluded}")
    if len(primary["records"]) != canonical:
        errors.append(f"primary evidence map mismatch: {len(primary['records'])}/{canonical}")
    lecture_backed = sum(
        mapping["primary_source_type"] == "lecture"
        for mapping in primary["records"].values()
    )
    book_backed = sum(
        mapping["primary_source_type"] == "book"
        for mapping in primary["records"].values()
    )
    coursera_backed = sum(
        mapping["primary_source_type"] == "coursera-public"
        for mapping in primary["records"].values()
    )
    bank_only = sum(
        mapping["primary_source_type"] == "question-bank"
        for mapping in primary["records"].values()
    )
    if (book_backed, coursera_backed, bank_only) != (54, 0, 38):
        errors.append(
            f"supplemental source split mismatch: "
            f"{book_backed}/{coursera_backed}/{bank_only}"
        )
    if lecture_backed + book_backed + coursera_backed + bank_only != 317:
        errors.append("primary source tiers do not reconcile to 317")
    if len(adjudications["records"]) != len(expected):
        errors.append(
            f"adjudication count mismatch: {len(adjudications['records'])}/{len(expected)}"
        )
    for qid, mapping in primary["records"].items():
        verdict = adjudications["records"][qid]["verdict"]
        if mapping["confidence"] in {"C", "BANK"} and verdict != "bank-key-only":
            errors.append(f"{qid}: limited evidence must remain bank-key-only")
        if mapping["primary_source_type"] == "question-bank":
            if mapping["primary_lecture"] is not None or mapping["primary_slides"] is not None:
                errors.append(f"{qid}: bank-only item must not invent a lecture mapping")
            continue
        if mapping["primary_source_type"] == "book":
            locator = mapping["source_locator"]
            book = GUIDE.parent / locator["path"]
            if not book.exists():
                errors.append(f"{qid}: local book missing")
            pages = locator["printed_pages"]
            if not pages or min(pages) < 1 or max(pages) > 548:
                errors.append(f"{qid}: invalid printed book pages")
            continue
        if mapping["primary_source_type"] == "coursera-public":
            if not mapping["source_locator"]["url"].startswith(
                "https://www.coursera.org/"
            ):
                errors.append(f"{qid}: non-official Coursera source")
            continue
        deck = SLIDES / mapping["primary_lecture"]
        if not deck.exists():
            errors.append(f"{qid}: mapped deck missing")
        elif deck.suffix.lower() == ".pptx":
            maximum = max(int(number) for number in re.findall(r"\d+", mapping["primary_slides"]))
            if maximum > len(Presentation(deck).slides):
                errors.append(f"{qid}: slide range exceeds deck")
    for record in data["records"]:
        qid = record["question_id"]
        block = block_by_id[qid]
        source = record["source"]
        adjudication = adjudications["records"][qid]
        required_source = [
            source["stem"],
            *[f"- **{letter}.** {source['options'][letter]}" for letter in "ABCD"],
            f"**Supplied answer:** {source['supplied_answer']['letter']}. "
            f"{source['supplied_answer']['text']}",
            f"### {qid} — `{source['module_tag']}` · {adjudication['verdict']}",
            f"**Why:** {adjudication['why']}",
        ]
        for value in required_source:
            if value not in block:
                errors.append(f"{qid}: source/adjudication mismatch")
                break
        mapping = primary["records"][qid]
        if mapping["primary_source_type"] == "lecture":
            if f"slides {mapping['primary_slides']}" not in block:
                errors.append(f"{qid}: primary slide mismatch")
        elif mapping["primary_source_type"] == "book":
            if "**Primary evidence:** [Sutton–Barto" not in block:
                errors.append(f"{qid}: book evidence label missing")
            for page in mapping["source_locator"]["printed_pages"]:
                if str(page) not in block:
                    errors.append(f"{qid}: printed book page missing")
                    break
        elif "**Canonical source:** supplied question bank" not in block:
            errors.append(f"{qid}: bank-only canonical-source label missing")
    for cluster in data["duplicate_clusters"]:
        if cluster["kind"] != "exact" or cluster["cluster_id"] == "EXACT-02":
            continue
        verdicts = {
            adjudications["records"][qid]["verdict"]
            for qid in cluster["members"]
        }
        if len(verdicts) != 1:
            errors.append(f"{cluster['cluster_id']}: inconsistent duplicate verdicts")
    lecture_anchors = set(re.findall(r'<a id="(lecture-\d+-\d+)"></a>', text))
    if len(lecture_anchors) != 37:
        errors.append(f"expected 37 numbered lecture anchors, found {len(lecture_anchors)}")
    for anchor in lecture_anchors:
        start = text.index(f'<a id="{anchor}"></a>')
        next_anchor = text.find('<a id="lecture-', start + 1)
        section = text[start:next_anchor if next_anchor != -1 else len(text)]
        if "**Depth:**" not in section and "**depth " not in section:
            errors.append(f"{anchor}: missing depth contract")
        if "**Demand and related practice:**" not in section:
            errors.append(f"{anchor}: missing demand/practice contract")
    for required in ("course-introduction", "course-review", "source-coverage",
                     "question-navigation", "canonical-source-supplements",
                     "full-question-bank"):
        if text.count(f'<a id="{required}"></a>') != 1:
            errors.append(f"required anchor {required} missing or duplicated")
    anchors = set(re.findall(r'<a id="([^"]+)"></a>', text))
    link_targets = re.findall(r"\]\(<([^>]+)>\)", text)
    link_targets += re.findall(r"\]\((?!<)([^)]+)\)", text)
    for cleaned in link_targets:
        if cleaned.startswith("#"):
            if cleaned[1:] not in anchors:
                errors.append(f"broken internal link: {cleaned}")
        elif not re.match(r"[a-z]+://", cleaned):
            path = (GUIDE.parent / cleaned.split("#", 1)[0]).resolve()
            if not path.exists():
                errors.append(f"broken local file link: {cleaned}")
    if re.search(r"\b(TODO|TBD|PLACEHOLDER)\b", text, re.IGNORECASE):
        errors.append("placeholder marker found")
    external_urls = re.findall(r"https?://[^)\s]+", text)
    for url in external_urls:
        if not url.startswith("https://www.coursera.org/"):
            errors.append(f"non-approved external URL found: {url}")
    forbidden_exclusion = (
        "quarantin",
        "unusable/out-of-scope",
        "unusable/unsupported",
        "excluded from",
    )
    for phrase in forbidden_exclusion:
        if phrase in text.lower():
            errors.append(f"obsolete exclusion language found: {phrase}")
    if errors:
        print("\n".join(f"ERROR: {error}" for error in errors))
        raise SystemExit(1)
    print(
        f"PASS: {len(ids)} questions; {canonical} canonical; {excluded} excluded; "
        f"{lecture_backed} slide-backed; {book_backed} book-backed; "
        f"{coursera_backed} Coursera-public; {bank_only} bank-only; "
        f"{len(lecture_anchors) + 2} lecture/framing anchors."
    )


if __name__ == "__main__":
    main()
