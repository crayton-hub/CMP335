const express = require("express");
const fs = require("fs");
const path = require("path");
const { parse } = require("csv-parse/sync");

const app = express();
const PORT = process.env.PORT || 3000;
const ROOT = path.join(__dirname, "..");
const PUBLIC_DIR = path.join(ROOT, "public");
const STATS_CSV = path.join(ROOT, "data", "cfb_2021_2025_team_stats.csv");

app.use(express.json());
app.use(express.static(PUBLIC_DIR));

function readTeamStats() {
  if (!fs.existsSync(STATS_CSV)) {
    throw new Error("Team statistics CSV was not found at data/cfb_2021_2025_team_stats.csv");
  }
  const csv = fs.readFileSync(STATS_CSV, "utf8");
  return parse(csv, { columns: true, skip_empty_lines: true, trim: true }).map(row => ({
    Season: Number(row.Season),
    Team: row.Team,
    Conference: row.Conference || "Unknown",
    Games: Number(row.Games),
    Wins: Number(row.Wins),
    Losses: Number(row.Losses),
    WinPct: Number(row.WinPct),
    PPG: Number(row.PPG),
    PAPG: Number(row.PAPG),
    PointDiff: Number(row.PointDiff)
  }));
}

function parseSeason(value) {
  if (value === undefined || value === "") return 2025;
  const season = Number(value);
  if (!Number.isInteger(season) || season < 1869 || season > 2100) return null;
  return season;
}

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "College Football Analytics API is running." });
});

app.get("/api/seasons", (req, res) => {
  try {
    const seasons = [...new Set(readTeamStats().map(row => row.Season))].sort((a, b) => b - a);
    res.json({ seasons });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/team-stats", (req, res) => {
  try {
    const season = parseSeason(req.query.season);
    if (season === null) return res.status(400).json({ error: "Season must be a valid year." });
    const teams = readTeamStats()
      .filter(row => row.Season === season)
      .sort((a, b) => b.WinPct - a.WinPct || b.PointDiff - a.PointDiff);
    res.json({ season, count: teams.length, teams });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/compare", (req, res) => {
  try {
    const season = parseSeason(req.query.season);
    const team1 = String(req.query.team1 || "").trim();
    const team2 = String(req.query.team2 || "").trim();
    if (season === null) return res.status(400).json({ error: "Season must be a valid year." });
    if (!team1 || !team2) return res.status(400).json({ error: "Provide team1 and team2 query parameters." });
    if (team1.toLowerCase() === team2.toLowerCase()) {
      return res.status(400).json({ error: "Choose two different teams." });
    }
    const teams = readTeamStats().filter(row => row.Season === season);
    const findTeam = name => teams.find(row => row.Team.toLowerCase() === name.toLowerCase());
    const first = findTeam(team1);
    const second = findTeam(team2);
    if (!first || !second) {
      return res.status(404).json({
        error: `One or both teams were not found for ${season}. Check spelling and available team names.`,
        availableTeams: teams.map(row => row.Team).sort()
      });
    }
    res.json({ season, team1: first, team2: second });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(PUBLIC_DIR, "index.html"));
});

app.listen(PORT, () => {
  console.log(`College Football Analytics is running at http://localhost:${PORT}`);
  console.log(`API health check: http://localhost:${PORT}/api/health`);
});
