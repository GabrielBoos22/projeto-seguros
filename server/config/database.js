const mongoose = require('mongoose');

// Connection URL
const url = 'mongodb://localhost:27017/seguros';

// Connect to the database
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

var db = mongoose.connection;

module.exports = db;
