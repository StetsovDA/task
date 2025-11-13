const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'TaskDB.db'), (err) => {
  if (err) {
    console.error('error:', err.message);
  } else {
    console.log('Connected');
  }
});

module.exports = db;