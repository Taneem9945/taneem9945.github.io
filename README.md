# Mohammad Taneem Bin Nazim

A static React portfolio following the layout of https://npkalinin.github.io/.

The header opens Research, Work, Teaching, and Projects views using URL hashes supported by GitHub Pages. The name links home. Research includes publications, and the homepage also shows the publication list. View content is stored in `src/assets/content.json`.

## Run locally

```sh
npm install
npm run dev
```

## Personalize

Edit `src/profile.js` to add your biography, affiliation, email, and news. Professional links and the CV path are saved in `src/assets/links.json`. Publications are saved in `src/assets/publications.json`. Empty links appear as muted icons until supplied. The portrait uses the image supplied in the project folder, with initials as a fallback.

Place your portrait and CV in `public/`. For example, add `photo.jpg` and `cv.pdf`, then set `photo: 'photo.jpg'` in `src/profile.js` and `"cv": "cv.pdf"` in `src/assets/links.json`. Use relative paths without a leading slash so assets work on both account and project Pages sites.

The current CV links to the supplied résumé at `public/documents/Nazim_Resume_26_Ind.pdf`. Original copies of the résumé, research statement, and teaching philosophy are retained locally in the Git-ignored `documents/` folder. The biography in `src/profile.js` draws on these three sources.

News entries use this shape.

```js
{ date: '2026-11-18', text: 'Your update here.' }
```

Publication entries in `src/assets/publications.json` use this shape. Citation counts are transcribed from the supplied Google Scholar screenshot. The quantum computing survey combines three entries as requested, totaling 103 (94 + 7 + 2). The conference-titled record is retained separately with 18 citations because its paper title is unconfirmed. These are sums of displayed counts and can include overlapping citing papers.

```json
{
  "title": "Your publication title",
  "url": "",
  "authors": ["Mohammad Taneem Bin Nazim"],
  "venue": "Conference or journal",
  "year": "2026",
  "citations": 0
}
```

## Publish on GitHub Pages

1. Create a GitHub repository named `YOUR_USERNAME.github.io` for an account site, or choose another repository name for a project site.
2. Push this project to its `main` branch, including `package-lock.json` and `.github/workflows/deploy.yml`.
3. In the repository, open **Settings → Pages** and select **GitHub Actions** as the source.
4. Open **Actions** and run **Deploy portfolio to GitHub Pages**, or push another commit to `main`.
5. The deployment reports your published URL. An account site uses `https://YOUR_USERNAME.github.io/`. A project site uses `https://YOUR_USERNAME.github.io/REPOSITORY/`.

The Vite configuration uses relative asset paths to support both locations. `npm run build` creates the static site in `dist/`. `npm run preview` serves the production build locally.

Deployment follows the [Vite GitHub Pages guide](https://vite.dev/guide/static-deploy.html#github-pages).
