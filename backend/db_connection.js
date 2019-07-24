const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();
const connection =
          mongoose
              .connect(
                process.env.mongodburl ,{ useNewUrlParser: true } )
              .then(() => {
                console.log("Connected to database!");
              })
              .catch(() => {
                console.log("Connection failed!");
              });

module.exports = connection;
