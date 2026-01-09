const getDB = require('../database/db');
const { triggerWebhook } = require('../services/webhookService');

/**
 * Controller updated to support SQLite's run() and all() methods.
 */

exports.createJob = async (req, res) => {
  const { taskName, payload, priority } = req.body;
  if (!taskName || !priority) return res.status(400).json({ error: 'Missing fields' });

  try {
    const db = await getDB();
    const result = await db.run(
      'INSERT INTO jobs (taskName, payload, priority, status) VALUES (?, ?, ?, ?)',
      [taskName, JSON.stringify(payload || {}), priority, 'pending']
    );
    res.status(201).json({ id: result.lastID, message: 'Job created in SQLite' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllJobs = async (req, res) => {
  const { status, priority } = req.query;
  let sql = 'SELECT * FROM jobs WHERE 1=1';
  const params = [];

  if (status && status !== 'all') { 
    sql += ' AND status = ?'; 
    params.push(status); 
  }
  if (priority && priority !== 'all') { 
    sql += ' AND priority = ?'; 
    params.push(priority); 
  }
  
  sql += ' ORDER BY createdAt DESC';
  
  try {
    const db = await getDB();
    const rows = await db.all(sql, params);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.runJob = async (req, res) => {
  const { id } = req.params;
  try {
    const db = await getDB();
    const job = await db.get('SELECT * FROM jobs WHERE id = ?', [id]);
    
    if (!job) return res.status(404).json({ error: 'Not found' });
    if (job.status !== 'pending') return res.status(400).json({ error: 'Job is not pending' });

    await db.run('UPDATE jobs SET status = "running", updatedAt = CURRENT_TIMESTAMP WHERE id = ?', [id]);
    res.json({ message: 'Execution started' });

    // Background Simulation
    setTimeout(async () => {
      const completedAt = new Date().toISOString();
      await db.run('UPDATE jobs SET status = "completed", completedAt = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?', [completedAt, id]);
      
      const finishedJob = { ...job, status: 'completed', completedAt };
      await triggerWebhook(finishedJob);
    }, 3000);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};