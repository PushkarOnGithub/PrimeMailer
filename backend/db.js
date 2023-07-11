const mongoose = require("mongoose");

// const mongoURI = "mongodb+srv://pushkarnull999:0JAQHbqSgbLvo2rL@cluster0.c37uic7.mongodb.net/primemailer";
const mongoURI = "mongodb://127.0.0.1:27017/primemailer";

const connectToMongo = async() => {
  await mongoose.connect(mongoURI,
  // await mongoose.connect(mongoURI,{useNewUrlParser: true, useUnifiedTopology: true},
    await console.log("Connected to Mongo Successfully")
  )
};

module.exports = connectToMongo;