require("dotenv").config();

const express = require('express');
const sequelize = require('./database');
const mongoose = require("mongoose")

const router = require('./router/router')
// let responseHandler = require('./middleware/responsehandler')
const dotenv = require('dotenv');

const cors = require('cors')

const app = express()

app.use(express.json());

app.use(cors());

const csv=require('csvtojson')





app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

// --------------mongoose connection-----------

// mongoose.connect("mongodb+srv://naaz:6IvHhqCECNV8sZwJ@cluster0.ag4v9nd.mongodb.net/pinkBlush?retryWrites=true&w=majority")
//     .then(() => {
//         console.log('connceted to database')
//     })
//     .catch(() => {
//         console.log('conncetion failed')
//     });
// ----------------------------------------------------------
app.use('/',router)
// app.use(responseHandler.onError);
const PORT= 5000
app.listen(process.env.APP_PORT, () => {
    console.log("Server running on PORT : ",process.env.APP_PORT);
});

// sequelize.sync({force:true})