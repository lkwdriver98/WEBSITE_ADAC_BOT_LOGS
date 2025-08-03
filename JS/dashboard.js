async function loadSummary() {
  try {
    const res = await fetch('/api/summary', { headers: { 'Authorization': 'Bearer ' + API_KEY } });
    const data = await res.json();
    document.getElementById('summary-content').textContent = `Gelöschte Nachrichten: ${data.total_logs}`;
  } catch (e) {
    document.getElementById('summary-content').textContent = 'Fehler: '+ e.message;
  }
}

async function loadLogs() {
  try {
    const res = await fetch('/api/logs', { headers: { 'Authorization': 'Bearer ' + API_KEY } });
    const logs = await res.json();
    const tbody = document.getElementById('logs-body');
    tbody.innerHTML = '';
    logs.forEach(log => {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${log.timestamp}</td><td>${log.content_hash}</td><td>${log.channel}</td>`;
      tbody.appendChild(tr);
    });
  } catch (e) {
    document.getElementById('logs-body').innerHTML = `<tr><td colspan="3">Fehler: ${e.message}</td></tr>`;
  }
}

window.addEventListener('DOMContentLoaded', () => {
  loadSummary();
  loadLogs();
});