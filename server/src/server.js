const path = require('path');
const morgan = require('morgan');
const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;

app.use(morgan('dev', {
  skip: (req, res) => {
    return res.statusCode < 400;
  },
  stream: process.stderr
}));

app.use(morgan('dev', {
  skip: (req, res) => {
    return res.statusCode >= 400;
  },
  stream: process.stdout
}));

// Serve any static files
app.use(express.static(path.join(__dirname, 'client/build')));

// API calls
app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/public', 'index.html'));
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
