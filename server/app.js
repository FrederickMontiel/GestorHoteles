"use strict";

//Variables Globals
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

//Import Routes
var user_routes = require("./src/Roots/UserRoot");
var hotel_routes = require("./src/Roots/HotelRoot");

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(bodyParser.json());
app.use(cors())
app.use("/api", user_routes, hotel_routes);

module.exports = app;
