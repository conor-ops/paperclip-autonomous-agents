const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const HOST = '0.0.0.0';

app.use(cors());
app.use(express.json());

// In-memory data store
let companies = [
  { id: 'comp-1', name: 'Paperclip Labs', mission: 'Build autonomous AI companies to $1M MRR', status: 'active', budgetMonthly: 500, spentCurrent: 142.50 },
  { id: 'comp-2', name: 'Nexus AI Studio', mission: 'Automated note-taking and knowledge graph', status: 'active', budgetMonthly: 300, spentCurrent: 89.20 }
];

let agents = [
  { id: 'ag-1', companyId: 'comp-1', name: 'Claude Opus (CEO)', role: 'Chief Executive Officer', provider: 'anthropic', model: 'claude-3-opus', status: 'running', budgetLimit: 200, spent: 65.40, title: 'CEO' },
  { id: 'ag-2', companyId: 'comp-1', name: 'Codex (CTO)', role: 'Chief Technology Officer', provider: 'openai', model: 'gpt-4o', status: 'running', budgetLimit: 150, spent: 48.10, title: 'CTO' },
];

let tasks = [
  { id: 'tsk-1', companyId: 'comp-1', title: 'Implement multi-tenant company isolation', assigneeId: 'ag-2', status: 'in_progress', priority: 'high', goal: 'Security & Infrastructure' },
];

let activityLogs = [
  { id: 'act-1', timestamp: new Date().toISOString(), actor: 'System', action: 'Initialized', type: 'system' }
];

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));
app.get('/api/companies', (req, res) => res.json(companies));
app.get('/api/agents', (req, res) => res.json(agents));
app.get('/api/tasks', (req, res) => res.json(tasks));
app.get('/api/activity', (req, res) => res.json(activityLogs));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

if (require.main === module && !process.argv.includes('--version')) {
  app.listen(PORT, HOST, () => {
    console.log('Paperclip Control Plane running on http://' + HOST + ':' + PORT);
  });
}
