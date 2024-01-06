const mongoose = require('mongoose');

const URI = process.env.MONGO_DB_URI;
const DB = 'SMART_SCHOOL';

const mongoConnect = async () => {
  try {
    await mongoose.connect(URI + '/' + DB);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log('MongoDB connection error:', error.message);
  }
};

module.exports = mongoConnect;
