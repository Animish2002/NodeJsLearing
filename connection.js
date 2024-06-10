const mongoose = require("mongoose");
mongoose.set("strictQuery",true)

async function connectMongoDb(url) {
  //Connection with mongodb

  return mongoose.connect(url);
}
module.exports = { connectMongoDb };
