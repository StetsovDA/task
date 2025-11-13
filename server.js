const express = require('express');
const cors = require('cors');
const taskRouter = require('./src/routes/route.js');

const app = express();
const PORT = 3001;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', taskRouter);

app.get('/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'error' });
});
