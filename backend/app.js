const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require('path');
const cors = require('cors');
const app = express();
const jwt = require('jsonwebtoken');
const getRawBody = require('raw-body');
const crypto = require('crypto');

const order_create =  require('../models/order_create');

app.use(bodyParser.json());


var distDir = __dirname + "../dist/";
console.log("distDir is",distDir);
app.use(express.static(distDir));


mongoose
    .connect(
      "mongodb://Shubham:Shubham0608@cluster0-shard-00-00-mmfvv.mongodb.net:27017,cluster0-shard-00-01-mmfvv.mongodb.net:27017,cluster0-shard-00-02-mmfvv.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority" ,{ useNewUrlParser: true } )
    .then(() => {
      console.log("Connected to database!");
    })
    .catch(() => {
      console.log("Connection failed!");
    });


  app.use(bodyParser.urlencoded({ extended: false }));

  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Headers,,CORELATION_ID Access-Control-Request-Method, Access-Control-Request-Headers"
    );
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader(
      "Access-Control-Allow-Methods",
      'GET, POST, PATCH, DELETE, OPTIONS,PUT, HEAD'
    );
    next();
  });


  app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
  });

  app.use(cors())
  app.options('*', cors())


  // Index Route
  app.get('/', (req, res) => {
    res.send('invaild endpoint here');
  });




  //receive call from shopify store webhooks
app.post('/order/create', (req, res) => {

    console.log(req.body);
    if(req.body.customer == null){
      req.body.customer = {
        phone: 'Not Known',
        email: 'Not Known',
        default_address:{
        name: 'Not Known',
        phone: 'Not Known',
        city: 'Not Known',
        }
      }
    }
    var post = new order_create({
        id : req.body.id,
        data: JSON.stringify(req.body)
    });
    post.save().then(createdPost => {
        console.log("post successfully saved");
      });

    res.sendStatus(200);
  })


  //get the list of all the orders created
app.get('/order/list',(req,res)=>{
    var data = [];
    order_create.find().then(documents =>{
        for(let i=0; i< documents.length; i++){
            data.push(JSON.parse(documents[i].data));
        }
        res.send(data);
    });
});


//updation of phoneno. and email
app.post('/order/update',(req,res)=>{
  console.log("i am here");
    order_create.findOne({id: req.body.id}, async function(err,order){
        data = JSON.parse(order.data);
        data.email = req.body.email;
        data.contact_email = req.body.email;
        data.customer.email = req.body.email;
        data.phone = req.body.mobile;
        data.billing_address.phone = req.body.mobile;
        data.shipping_address.phone = req.body.mobile;
        data.customer.phone = req.body.mobile;
        data.customer.default_address.phone = req.body.mobile;
        res.send(data);
        order.data = JSON.stringify(data);
        order.save().then(createdPost => {
            console.log("post successfully updated");

          });
    });
})



//deletion of a particular order from a list
app.delete("/order/delete/:id", (req, res, next) => {
  console.log("i reached here");
  order_create.deleteOne({ id: req.params.id}).then(result => {
    console.log(result);
    res.send("deleted");
  });
});

module.exports = app;
