const seasonSelect = document.querySelector("#season-select");
const teamTable = document.querySelector("#team-table");
const tableStatus = document.querySelector("#table-status");
const searchInput = document.querySelector("#team-search");
let currentTeams = [];

async function getJson(url) {
  const response = await fetch(url);
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || `Request failed (${response.status})`);
  return data;
}
function formatPct(value) { return `${(Number(value) * 100).toFixed(1)}%`; }
function renderTeams() {
  const term = searchInput.value.trim().toLowerCase();
  const filtered = currentTeams.filter(t => t.Team.toLowerCase().includes(term) || String(t.Conference).toLowerCase().includes(term));
  if (!filtered.length) {
    teamTable.innerHTML = '<tr><td colspan="7">No teams match your search.</td></tr>';
    return;
  }
  teamTable.innerHTML = filtered.map((t, index) => `<tr>
    <td><span class="rank">${index + 1}.</span> <strong>${escapeHtml(t.Team)}</strong></td>
    <td>${escapeHtml(t.Conference || "Unknown")}</td>
    <td>${t.Wins}-${t.Losses}</td><td>${formatPct(t.WinPct)}</td>
    <td>${Number(t.PPG).toFixed(2)}</td><td>${Number(t.PAPG).toFixed(2)}</td>
    <td>${Number(t.PointDiff).toFixed(2)}</td>
  </tr>`).join("");
}
function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[c]));
}
async function loadSeasonOptions() {
  const data = await getJson("/api/seasons");
  seasonSelect.innerHTML = data.seasons.map(y => `<option value="${y}">${y}</option>`).join("");
  if (data.seasons.includes(2025)) seasonSelect.value = "2025";
  await loadTeams();
}
async function loadTeams() {
  tableStatus.textContent = "Loading team statistics...";
  try {
    const data = await getJson(`/api/team-stats?season=${encodeURIComponent(seasonSelect.value)}`);
    currentTeams = data.teams;
    tableStatus.textContent = `${data.count} teams found for ${data.season}. Sorted by winning percentage, then point differential.`;
    renderTeams();
  } catch (error) {
    tableStatus.textContent = error.message;
    teamTable.innerHTML = '<tr><td colspan="7">Could not load data.</td></tr>';
  }
}
seasonSelect.addEventListener("change", loadTeams);
searchInput.addEventListener("input", renderTeams);
document.querySelector("#refresh-button").addEventListener("click", loadTeams);
getJson("/api/health").then(data => {
  document.querySelector("#api-status").textContent = `Backend connected: ${data.message}`;
}).catch(() => {
  document.querySelector("#api-status").textContent = "Backend is not connected. Start the server with npm start.";
});
loadSeasonOptions().catch(error => {
  tableStatus.textContent = error.message;
});
