const express = require('express');
const fs = require('fs');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const userModel = require('../models/users');
const productModel = require('../models/product');
const url = 'mongodb+srv://admin:admin@andromeda.esfay3s.mongodb.net/andromeda';
const { config } = require('dotenv');

config({ path: '../config/config.env' });

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log('DB connection successful!'));

const importProductData = async () => {
  try {
    res = JSON.stringify(await productModel.find({}));
    fs.writeFile('./product-data.json', res, (err) => {
      if (err) throw err;
    });
  } catch (e) {
    console.log(e);
  }
  try {
    res = JSON.stringify(await userModel.find({}));
    fs.writeFile('./user-data.json', res, (err) => {
      if (err) throw err;
    });
  } catch (e) {
    console.log(e);
  }
};

const importUserData = async () => {
  try {
    res = JSON.stringify(await userModel.find({}));
    fs.writeFile('./user-data.json', res, (err) => {
      if (err) throw err;
    });
  } catch (e) {
    console.log(e);
  }
};

importProductData();
