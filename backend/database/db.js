const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const path = require('path');

async function getDB() {
  const db = await open({
    filename: path.join(__dirname, 'jobs.sqlite'),
    driver: sqlite3.Database
  });

 
  await db.exec(`
    CREATE TABLE IF NOT EXISTS jobs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      taskName TEXT NOT NULL,
      payload TEXT,
      priority TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'pending',
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      completedAt DATETIME
    )
  `);

  return db;
}

console.log('SQLite Database Logic Ready');

module.exports = getDB;