const express = require('express');
const path = require('path');
const morgan = require('morgan');

const PORT = process.env.PORT || 5000;

const app = express();

// Use morgan module for logging
app.use(morgan('dev'));

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
