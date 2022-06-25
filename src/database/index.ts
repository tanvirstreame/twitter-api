import mongoose from 'mongoose';
require('dotenv').config()

/**
 * Database setip are here
 */

mongoose.connect(process.env.DB_STRING);

mongoose.connection.on("error", (error) => {
  console.log(error);
})
mongoose.connection.once("open", (error) => {
  console.log("Connected successfully");
})
