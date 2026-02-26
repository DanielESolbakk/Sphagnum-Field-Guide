# Sphagnum Field Guide - AI Coding Instructions

This repository is a Jekyll-based scientific field guide for identifying *Sphagnum* species.

## 1) Project Architecture (Current)

- Taxonomic content is folder-based and fixed by scientific hierarchy (for example: `Subgenus Cuspidata/Sphagnum annulatum/index.md`).
- Each taxonomic level uses an `index.md` page.
- Shared templates/components are in `_layouts/` and `_includes/`; shared data is in `_data/`; assets are in `assets/`.
- Navigation is **not dynamic**:
	- `_config.yml` uses explicit `include:` entries.
	- `_layouts/default.html` contains hard-coded nav links (`<li>` list items).
	- If adding a top-level section/subgenus, update both files manually.

## 2) Core Authoring Workflow

When adding or updating a species page:

1. Create or edit `Subgenus [Name]/Sphagnum [species]/index.md`.
2. Keep frontmatter minimal and consistent (`layout`, `title`).
3. Follow existing section structure where applicable (Description, General, Capitulum, Branches, Stem, Habitat, etc.).
4. Add/organize images in the same species folder.
5. Update parent taxon `index.md` lists when needed.
6. Apply citations and Sources formatting rules in Section 4 of this file.
7. Validate glossary tooltips, links, and image metadata before finalizing.

## 3) Scientific Integrity Rules (Strict)

- Do **not** invent, infer, or fill in missing scientific facts.
- Do **not** paraphrase or alter scientific meaning of:
	- taxonomic ranks
	- diagnoses
	- character states
	- morphological terminology
	- ecological scope/distribution scope
- Preserve original scientific terms exactly when sourced.
- Do **not** replace scientific terms with simpler synonyms.
- If plain-language rewriting is requested:
	- retain original scientific terms unchanged
	- clearly separate interpretation from sourced facts
	- never let interpretation replace the original claim
- If evidence is incomplete, state that it is unknown or unspecified in available sources rather than guessing.

## 4) Source Policy (Mandatory for Scientific Claims)

Every substantive scientific claim must be traceable to a source.

### 4.1 Inline citation requirement

- Add inline citations using superscript links, e.g.:
	`<sup><a href="#flatberg1988-annulatum">1</a></sup>`
- Use file-level/section-level citation placement (as in `Subgenus Cuspidata/Sphagnum annulatum/index.md`), not sentence-by-sentence citation placement.
- Group sources at heading or section level when they support the whole section.

### 4.2 End-of-page Sources section requirement

- Every page with scientific claims must end with a Sources section.
- Use the same style already used in `Subgenus Cuspidata/Sphagnum annulatum/index.md`, including:
	- anchor id for sources section
	- numbered `<ol>` list
	- stable `<li id="...">` anchors for cross-reference
- Recommended structure:

```html
<a id="sources"></a>
## <strong>Sources: Text & Images</strong>

<ol>
	<li id="source-id-1">...</li>
	<li id="source-id-2">...</li>
</ol>
```

- Keep id values stable so inline anchors remain valid.
- If images have distinct provenance/licensing, include image source details in the same section or directly under the image where already used by project pattern.

## 5) Uncertainty & Conflicting References

When sources disagree or are ambiguous:

1. Surface the conflict explicitly (do not hide it).
2. Present each supported alternative with citations.
3. Mark which statement belongs to which source.
4. Ask the user/editor how to resolve emphasis when editorial choice is required.
5. Do not guess, merge, or harmonize conflicting claims without instruction.

## 6) Glossary Tooltip Policy

- `_data/glossary.yml` is the single source of term definitions.
- On first meaningful occurrence of a technical term, use:
	`{% include tooltip.html term="key" text="display text" %}`
- Do not add ad-hoc inline definitions in species pages.
- If a term is missing:
	1. add it to `_data/glossary.yml` (lowercase key, hyphenate multiword keys),
	2. then use the tooltip include.
- Avoid repeated tooltip wrapping for the same term in the same page unless needed for clarity.

## 7) Lookalikes Include Policy

- Use lookalikes includes only for true multi-species diagnosable complexes.
- One include per complex in `_includes/lookalikes/`; do not create per-species lookalike includes for solitary taxa.
- Existing pattern reference:
	`{% include lookalikes/lookalikes-complex-annulatum.html %}`

## 8) URL & Link Policy

- Folder names with spaces must be URL-encoded in links (e.g., `Subgenus%20Cuspidata`).
- Keep internal links consistent with actual folder/file names.
- Verify anchors and encoded paths after edits.

## 9) Images, Licensing, and Accessibility

- Every image must include meaningful `alt` text.
- Use descriptive filenames where possible.
- Do not add images with unknown or incompatible rights.
- When an image is not original work, provide source + publisher/author + license (for example CC BY 4.0) in the page using established project style.
- Do not remove existing license attributions.

## 10) Existing UI / Theme Constraints

- Preserve current mobile-first behavior and tooltip behavior.
- Continue using existing theme variables from `assets/style.css`; do not introduce arbitrary hardcoded theme colors.
- Keep look-and-feel changes minimal unless explicitly requested.

## 11) Finalization Checklist (Run Before Completing Any Edit)

- [ ] Scientific facts are sourced; no invented claims.
- [ ] Scientific terms/character states/taxonomic wording are not altered from source meaning.
- [ ] The page uses file-level/section-level inline citations consistent with `Subgenus Cuspidata/Sphagnum annulatum/index.md`.
- [ ] Sources section exists at end with `<ol>` and stable `id` anchors.
- [ ] Conflicts/uncertainty are explicitly surfaced and not guessed.
- [ ] Glossary tooltip rules are followed (first occurrence, valid key, no ad-hoc definitions).
- [ ] Lookalikes usage follows complex-only policy.
- [ ] URL encoding and internal links are correct.
- [ ] Images have `alt` text and proper source/license attribution.
- [ ] If adding top-level taxonomy/nav items: `_config.yml` and `_layouts/default.html` are both updated manually.