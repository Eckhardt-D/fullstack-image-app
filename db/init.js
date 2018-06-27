const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/instaclone');

const db = mongoose.connection;

db.on('error', (e) => console.log(e));
db.once('open', () => console.log('Connected to the database'));

module.exports = mongoose;