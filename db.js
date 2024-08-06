const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

async function connectToDB() {
  const uri = process.env.URI;
  try {
    const conn = await mongoose.connect(uri);

    console.log(
      "MONGODB DATABASE CONNECTED WITH mongoose ODM --> " + conn.connection.host
    );
  } catch (error) {
    console.error("Failed to connect to MongoDB");
    process.exit(1);
  }
}

module.exports = { connectToDB };
