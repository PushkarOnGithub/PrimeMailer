const mongoose = require("mongoose");
require('dotenv').config();
const mongoURI = process.env.MONGO_URI;
// const mongoURI = "mongodb://127.0.0.1:27017/primemailer";

const connectToMongo = async() => {
  // await mongoose.connect(mongoURI,
  await mongoose.connect(mongoURI,{useNewUrlParser: true, useUnifiedTopology: true},
    await console.log("Connected to Mongo Successfully")
  )
};

module.exports = connectToMongo;