const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/admin', express.static(path.join(__dirname, 'public/admin')));

// Helper paths
const LEADS_FILE = path.join(__dirname, '../data/leads.json');
const PROJECTS_FILE = path.join(__dirname, '../data/projects.json');

const readJSON = (file) => {
  try {
    if (!fs.existsSync(file)) return [];
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (err) {
    console.error(`Lỗi đọc file ${file}:`, err);
    return [];
  }
};

const writeJSON = (file, data) => {
  try {
    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error(`Lỗi ghi file ${file}:`, err);
    return false;
  }
};

// --- LEADS API ---
app.get('/api/leads', (req, res) => {
  const leads = readJSON(LEADS_FILE);
  res.json({ success: true, count: leads.length, data: leads });
});

app.post('/api/leads', (req, res) => {
  const { name, email, phone, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Vui lòng cung cấp đủ Họ tên, Email và Lời nhắn.' });
  }

  const leads = readJSON(LEADS_FILE);
  const newLead = {
    id: `lead-${Date.now()}`,
    name,
    email,
    phone: phone || '',
    message,
    status: 'new', // 'new' | 'contacted' | 'closed'
    createdAt: new Date().toISOString()
  };

  leads.unshift(newLead);
  writeJSON(LEADS_FILE, leads);

  res.status(201).json({ success: true, message: 'Gửi thông tin liên hệ thành công!', data: newLead });
});

app.patch('/api/leads/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const leads = readJSON(LEADS_FILE);

  const idx = leads.findIndex(l => l.id === id);
  if (idx === -1) {
    return res.status(404).json({ success: false, message: 'Không tìm thấy lead tương ứng.' });
  }

  leads[idx].status = status || leads[idx].status;
  leads[idx].updatedAt = new Date().toISOString();
  writeJSON(LEADS_FILE, leads);

  res.json({ success: true, message: 'Cập nhật trạng thái lead thành công.', data: leads[idx] });
});

app.delete('/api/leads/:id', (req, res) => {
  const { id } = req.params;
  let leads = readJSON(LEADS_FILE);
  const initialLen = leads.length;

  leads = leads.filter(l => l.id !== id);
  if (leads.length === initialLen) {
    return res.status(404).json({ success: false, message: 'Không tìm thấy lead cần xóa.' });
  }

  writeJSON(LEADS_FILE, leads);
  res.json({ success: true, message: 'Đã xóa lead thành công.' });
});

// --- PROJECTS & CMS API ---
app.get('/api/projects', (req, res) => {
  const projects = readJSON(PROJECTS_FILE);
  res.json({ success: true, count: projects.length, data: projects });
});

app.put('/api/projects/:id', (req, res) => {
  const { id } = req.params;
  const { liveUrl, githubUrl, imageUrl, status } = req.body;
  const projects = readJSON(PROJECTS_FILE);

  const idx = projects.findIndex(p => p.id === id);
  if (idx === -1) {
    return res.status(404).json({ success: false, message: 'Không tìm thấy dự án trong CMS.' });
  }

  projects[idx].liveUrl = liveUrl !== undefined ? liveUrl : projects[idx].liveUrl;
  projects[idx].githubUrl = githubUrl !== undefined ? githubUrl : projects[idx].githubUrl;
  projects[idx].imageUrl = imageUrl !== undefined ? imageUrl : projects[idx].imageUrl;
  projects[idx].status = status || (projects[idx].liveUrl ? 'Sẵn sàng trải nghiệm' : 'Vui lòng bổ sung trong CRM');

  writeJSON(PROJECTS_FILE, projects);
  res.json({ success: true, message: 'Cập nhật thông tin dự án trong CMS thành công!', data: projects[idx] });
});

// --- STATS OVERVIEW ---
app.get('/api/stats', (req, res) => {
  const leads = readJSON(LEADS_FILE);
  const projects = readJSON(PROJECTS_FILE);

  const newLeads = leads.filter(l => l.status === 'new').length;
  const contactedLeads = leads.filter(l => l.status === 'contacted').length;
  const closedLeads = leads.filter(l => l.status === 'closed').length;

  const pendingProjects = projects.filter(p => !p.liveUrl).length;

  res.json({
    success: true,
    data: {
      totalLeads: leads.length,
      newLeads,
      contactedLeads,
      closedLeads,
      totalProjects: projects.length,
      pendingProjects
    }
  });
});

// Root redirect
app.get('/', (req, res) => {
  res.redirect('/admin');
});

// Khởi chạy máy chủ
app.listen(PORT, () => {
  console.log(`[Backend CMS] Server đang chạy tại http://localhost:${PORT}`);
  console.log(`[Backend CMS] Trang quản trị Admin Dashboard: http://localhost:${PORT}/admin`);
});
