# Project Topic Proposal Files

This repository contains three project proposal topics. The reviewable source files are the editable Markdown drafts (`Proposal Draft.md`), while the Word documents (`Proposal - Azeta Duke.docx`) are generated artifacts.

## Proposal Topics

- `CBT System/`
- `Pharmacy Inventory/`
- `PHC Maternal Care/`

## Script Prerequisite

The proposal update scripts require `python-docx`.

```bash
python3 -m pip install python-docx
```

## Regenerating the Word Documents

Run the following commands from the repository root:

```bash
python3 'CBT System/scripts/update_proposal_docx.py'
python3 'Pharmacy Inventory/scripts/update_pharmacy_proposal_docx.py'
python3 'PHC Maternal Care/scripts/update_maternal_proposal_docx.py'
```

## What the Scripts Update

- `CBT System/scripts/update_proposal_docx.py` regenerates `CBT System/Proposal - Azeta Duke.docx`.
- `Pharmacy Inventory/scripts/update_pharmacy_proposal_docx.py` regenerates `Pharmacy Inventory/Proposal - Azeta Duke.docx`.
- `PHC Maternal Care/scripts/update_maternal_proposal_docx.py` regenerates `PHC Maternal Care/Proposal - Azeta Duke.docx`.

## Current Workflow

1. Update the relevant `Proposal Draft.md` file.
2. Run the matching update script.
3. Use the markdown drafts and scripts as the reviewable source of truth for PRs. Regenerate the `.docx` files locally when needed, but avoid including binary-only updates in a PR unless they are explicitly required.
