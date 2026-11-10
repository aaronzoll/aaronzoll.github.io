# Adding the quick-check material to aaronzoll.github.io

The zip mirrors the site's root folder. Copy each item to the same place in your repository:

| From the zip | To the repository | What it is |
|---|---|---|
| `qc-map/` (4 files) | `qc-map/` at the repo root | The interactive map, served at `/qc-map/` |
| `files/quick_check_questions.pdf` | `files/` | The LaTeX write-up |
| `quick-check-questions.md` | `_pages/` | The page that links to both, served at `/quick-check-questions/` |

Then commit and push. GitHub Pages rebuilds in a minute or two.

Notes
- `qc-map/index.html` has no front matter on purpose. Jekyll copies it unchanged, so it keeps its own chalkboard look and your site's layout and MathJax don't touch it. Keep the four files in `qc-map/` together.
- Hidden from the public: nothing on the site links to these pages, `sitemap: false` keeps the page out of the sitemap, and the map has a `noindex` tag. Anyone with the URL can still open them. To list the page later, add it to `_data/navigation.yml`.
- Front matter: if your other pages in `_pages/` use more keys, such as `layout: archive` or `author_profile: true`, copy them into `quick-check-questions.md`.
- The map needs internet for Plotly, MathJax and the IBM Plex fonts, which load from cdnjs and Google Fonts.
- Updating questions: edit `questions.yaml` in the project, run `python3 build.py`, and copy the new `app/questions_data.js` over `qc-map/questions_data.js`.
- If `/files/...` links don't work on your site, move the PDF into whatever folder your other downloads use and fix the link in the Markdown.
