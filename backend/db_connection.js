const mongoose = require("mongoose");

const connection =
          mongoose
              .connect(
                "mongodb://Shubham:Shubham0608@cluster0-shard-00-00-mmfvv.mongodb.net:27017,cluster0-shard-00-01-mmfvv.mongodb.net:27017,cluster0-shard-00-02-mmfvv.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority" ,{ useNewUrlParser: true } )
              .then(() => {
                console.log("Connected to database!");
              })
              .catch(() => {
                console.log("Connection failed!");
              });

module.exports = connection;
