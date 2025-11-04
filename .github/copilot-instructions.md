# Sphagnum Field Guide - AI Coding Instructions

This is a Jekyll-based botanical field guide for identifying Sphagnum moss species, deployed to GitHub Pages.

## Architecture & Project Structure

**Taxonomic Hierarchy**: Content follows strict scientific classification with folders like `Subgenus Cuspidata/Sphagnum annulatum/` containing species pages, images, and microscopy photos. Each level has an `index.md` with species listings.

**Jekyll Configuration**: `_config.yml` lists each subgenus directory explicitly under `include:` (no auto‑discovery). Navigation in `_layouts/default.html` is fully hard‑coded (`<li>` links). When adding a new subgenus or top-level section you must (a) add the folder to `_config.yml` if not already included and (b) manually add a `<li>` in the layout—there is currently NO dynamic taxonomy include.

**Content Patterns**: Species pages follow consistent structure:
- Frontmatter with `layout: default` and `title: [Species name]`
- Scientific description sections (General, Capitulum, Branches, Stem, Habitat)
- Image galleries with lazy loading (`loading="lazy"`)
- Optional lookalikes section (only when part of a defined multi‑species complex). Currently the only implemented example is the annulatum complex include: `{% include lookalikes/lookalikes-complex-annulatum.html %}` (covers *S. annulatum*, *S. jensenii*, *S. balticum*, *S. majus*). Do NOT create per‑species lookalike includes for solitary taxa.
- Academic references with numbered citations

## Key Components

**Glossary System**: `_data/glossary.yml` is the single source of truth for term definitions. On the FIRST meaningful occurrence of a technical term in a page wrap it with `{% include tooltip.html term="[glossary-key]" text="Display Text" %}` (e.g. `{% include tooltip.html term="capitulum" text="capitulum" %}`). Do NOT inline ad‑hoc definitions in species pages. If a term is missing: add it (key: lowercase, hyphenate if multiword) to the YAML, then use the include. Avoid repeating tooltips for the same term multiple times in one page.

**Mobile-First Responsive Design**: 
- CSS in `assets/style.css` with mobile breakpoint at 600px
- JavaScript tooltip positioning in `assets/tooltip-mobile.js` handles viewport constraints
- Images auto-scale: `max-width: 1200px` desktop, `width: 100%` mobile

## Development Workflows

**Adding Species**: 
1. Create `Subgenus [Name]/Sphagnum [species]/index.md` 
2. Add images to species folder
3. Update parent subgenus `index.md` species list
4. Follow description template from `Sphagnum annulatum/index.md`

**Image Handling**: Place species photos directly in species folders. Use descriptive filenames. Always include `alt` attributes for accessibility.

**Lookalikes Pattern**: Only create an include in `_includes/lookalikes/` when several closely related species form a diagnosable complex and share comparative characters. One file per complex (not per species). Current example: `lookalikes-complex-annulatum.html` (annulatum / jensenii / balticum / majus). 

## Project-Specific Conventions

**URL Encoding**: Folder names with spaces become URL-encoded (e.g., `Subgenus%20Cuspidata`). Use this pattern in all internal links.

**Scientific Formatting**: 
 - Species names in italics: `*Sphagnum annulatum*`
 - Bold for key identifying features: `**terminal bud conspicuous**`
 - Superscript citations: Minimal HTML example: <sup>1</sup> (In species pages, wrap the number in an anchor pointing to the references section id.)

**Botanical Terminology**: Always use precise scientific terms. Reference `_data/glossary.yml` for definitions. When adding new terms, update glossary first, then use tooltip includes.

**Theme System**: `assets/theme-toggle.js` sets `data-theme="light|dark"` on `<html>` and persists choice in `localStorage` (`theme`). Styling relies on CSS custom properties declared twice (light & dark blocks) in `assets/style.css`: `--theme-bg`, `--theme-fg`, `--tooltip-bg`, `--tooltip-accent`, `--tooltip-accent-hover`, plus dynamic `--arrow-left` set inline for mobile tooltip positioning. When adding new UI elements: (1) consume existing vars instead of hardcoding colors; (2) if you introduce a new semantic color, define it in BOTH theme blocks; (3) never rely on raw hex values inside component rules.

## File Organization Rules

- Species content goes in taxonomic folders matching scientific classification
- Shared assets in `assets/` directory
- Includes for reusable content in `_includes/`
- All botanical data in `_data/` YAML files