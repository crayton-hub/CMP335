# College Football Analytics — Local Starter

This version keeps the supplied Python scripts and CSV datasets, and adds a Node.js/Express server and two browser pages.

## Project layout

- `backend/server.js` — Express server and REST API routes
- `public/index.html` — homepage with searchable season rankings
- `public/head-to-head.html` — season-based team comparison page
- `public/style.css`, `public/app.js`, `public/head-to-head.js` — frontend styles and behavior
- `python/` — your original Python scripts
- `data/` — your supplied CSV files
- `original-files/` — copies of the original HTML/CSS pages for reference

## Run locally

1. Install Node.js LTS if it is not already installed: https://nodejs.org/
2. Extract this folder somewhere convenient, then open the `college-football-analytics` folder in VS Code.
3. Open Terminal → New Terminal in VS Code.
4. Confirm the terminal is in the project root (the folder containing `package.json`).
5. Run:

   ```bash
   npm install
   npm start
   ```

6. Open http://localhost:3000 in your browser.
7. Open http://localhost:3000/head-to-head.html to compare teams.

Stop the server with `Ctrl+C`.

## API routes to test in Postman

- `GET http://localhost:3000/api/health`
- `GET http://localhost:3000/api/seasons`
- `GET http://localhost:3000/api/team-stats?season=2023`
- `GET http://localhost:3000/api/compare?season=2023&team1=Michigan&team2=Ohio%20State`

The API uses the already-generated `data/cfb_2021_2025_team_stats.csv`. It does not call the external CollegeFootballData API on every page load.

## Important notes

- The uploaded `HeadtoHead.HTML` was a Lions survey form and referenced `Survey.css`, which was not included. A new football comparison page is supplied in `public/head-to-head.html`; the original survey is preserved in `original-files/HeadtoHead.HTML`.
- The original homepage referenced a `CFBmedia` folder, but that folder was not among the uploaded files. The new homepage uses CSS styling instead, so it doesn't depend on those missing images.
- The Python scripts are copied into `python/`, but they have not been rewritten. The API key fields in `cfb_test.py` and `historical_cfb.py` are blank. If you later run those scripts against the external API, use an environment variable or a local `.env` file excluded from version control rather than committing a key.
- The team statistics are based on the existing CSV. This starter does not yet use a database; that can be added after the Express API is working.
