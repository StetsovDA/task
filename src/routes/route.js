const express = require('express');
const db = require('../../database');
const router = express.Router();

router.get('/tasks', (request, response) => {
  const query = 'SELECT * FROM TaskTable';
  
  db.all(query, [], (err, rows) => {
    if (err) {
      response.status(500).json({ error: err.message });
      return;
    }
    response.json(rows);
  });
});

router.get('/tasks/:UserID', (request, response) => {
  const { UserID } = request.params;
  const query = 'SELECT * FROM TaskTable WHERE UserID = ?';
  
  db.get(query, [UserID], (err, row) => {
    if (err) {
      response.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      response.status(404).json({ message: 'User not found' });
      return;
    }
    response.json(row);
  });
});

router.post('/tasks', (request, response) => {
  const { UserID, UserName, UserLastName } = request.body;
  
  if (!UserID || !UserName || !UserLastName) {
    response.status(400).json({ error: 'error' });
    return;
  }
  
  const query = 'INSERT INTO TaskTable (UserID, UserName, UserLastName) VALUES (?, ?, ?)';
  
  db.run(query, [UserID, UserName, UserLastName], function(err) {
    if (err) {
      response.status(500).json({ error: err.message });
      return;
    }
    response.status(201).json({ 
      id: this.lastID,
      UserID,
      UserName,
      UserLastName
    });
  });
});

router.put('/tasks/:UserID', (request, response) => {
  const { UserID } = request.params;
  const { UserName, UserLastName } = request.body;
  
  const query = 'UPDATE TaskTable SET UserName = ?, UserLastName = ? WHERE UserID = ?';
  
  db.run(query, [UserName, UserLastName, UserID], function(err) {
    if (err) {
      response.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      response.status(404).json({ message: 'User not found' });
      return;
    }
    response.json({ message: 'User updated' });
  });
});

router.delete('/tasks/:UserID', (request, response) => {
  const { UserID } = request.params;
  const query = 'DELETE FROM TaskTable WHERE UserID = ?';
  
  db.run(query, [UserID], function(err) {
    if (err) {
      response.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      response.status(404).json({ message: 'User not found' });
      return;
    }
    response.json({ message: 'User deleted' });
  });
});

module.exports = router;