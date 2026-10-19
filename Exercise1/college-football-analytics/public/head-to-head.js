const seasonSelect = document.querySelector("#season-select");
const team1Select = document.querySelector("#team1-select");
const team2Select = document.querySelector("#team2-select");
const status = document.querySelector("#compare-status");
const comparison = document.querySelector("#comparison");

async function getJson(url) {
  const response = await fetch(url);
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || `Request failed (${response.status})`);
  return data;
}
function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[c]));
}
function pct(value) { return `${(Number(value) * 100).toFixed(1)}%`; }
async function loadTeams() {
  try {
    const data = await getJson(`/api/team-stats?season=${encodeURIComponent(seasonSelect.value)}`);
    const options = data.teams.map(t => `<option value="${escapeHtml(t.Team)}">${escapeHtml(t.Team)}</option>`).join("");
    const previous1 = team1Select.value, previous2 = team2Select.value;
    team1Select.innerHTML = options;
    team2Select.innerHTML = options;
    if ([...team1Select.options].some(o => o.value === previous1)) team1Select.value = previous1;
    if ([...team2Select.options].some(o => o.value === previous2)) team2Select.value = previous2;
    if (team1Select.options.length > 1 && team1Select.value === team2Select.value) team2Select.selectedIndex = 1;
    status.textContent = `${data.count} teams available for ${data.season}.`;
    comparison.innerHTML = "";
  } catch (error) { status.textContent = error.message; }
}
function teamCard(team) {
  return `<article class="panel">
    <div class="eyebrow">${escapeHtml(team.Conference || "Conference unknown")}</div>
    <h2>${escapeHtml(team.Team)}</h2>
    <div class="metric-grid">
      <div class="metric"><span>Record</span><strong>${team.Wins}-${team.Losses}</strong></div>
      <div class="metric"><span>Win percentage</span><strong>${pct(team.WinPct)}</strong></div>
      <div class="metric"><span>Points per game</span><strong>${Number(team.PPG).toFixed(2)}</strong></div>
      <div class="metric"><span>Points allowed / game</span><strong>${Number(team.PAPG).toFixed(2)}</strong></div>
      <div class="metric"><span>Point differential / game</span><strong>${Number(team.PointDiff).toFixed(2)}</strong></div>
      <div class="metric"><span>Games counted</span><strong>${team.Games}</strong></div>
    </div>
  </article>`;
}
async function compare() {
  try {
    const params = new URLSearchParams({ season: seasonSelect.value, team1: team1Select.value, team2: team2Select.value });
    const data = await getJson(`/api/compare?${params.toString()}`);
    comparison.innerHTML = teamCard(data.team1) + teamCard(data.team2);
    status.textContent = `Comparing ${data.team1.Team} and ${data.team2.Team} in ${data.season}.`;
  } catch (error) {
    comparison.innerHTML = "";
    status.textContent = error.message;
  }
}
seasonSelect.addEventListener("change", loadTeams);
document.querySelector("#compare-button").addEventListener("click", compare);
async function init() {
  const data = await getJson("/api/seasons");
  seasonSelect.innerHTML = data.seasons.map(y => `<option value="${y}">${y}</option>`).join("");
  if (data.seasons.includes(2025)) seasonSelect.value = "2025";
  await loadTeams();
  await compare();
}
init().catch(error => { status.textContent = error.message; });
