const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  touchdowns: Number,
  rushingyards: Number
});

module.exports = mongoose.model('Player', playerSchema);
  