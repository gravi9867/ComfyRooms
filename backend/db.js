const mongoose = require("mongoose");

var mongoURL =
  "mongodb+srv://ravigiri9867:Ravi9867@hotelrooms.v2gy9.mongodb.net/mern-rooms";

mongoose.connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true });

var connection = mongoose.connection;

connection.on("error", () => {
  console.log("Mongo DB Connection failed");
});

connection.on("connected", () => {
  console.log("Mongo DB  Connection Successful");
});

module.exports = mongoose;
