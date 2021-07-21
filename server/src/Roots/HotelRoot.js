"use strict";

var express = require("express");
var hotelController = require("../Controllers/HotelController");

var md_autorizacion = require("../Middlewares/authentication");

var api = express.Router();
api.get("/hotel/list", hotelController.listarHoteles);
api.post("/hotel/search", hotelController.buscarHoteles);
api.post("/hotel/", md_autorizacion.ensureAuth, hotelController.addHotel);
api.get("/hotel/:idHotel", hotelController.getHotel);
api.post("/hotel/:idHotel/room/:idHotel", hotelController.searchRoom);
api.post("/room/verify/:idRoom", hotelController.verifyRoom);
api.post("/room/:idHotel", hotelController.addRooms);
api.delete("/deleteHotel/:id", hotelController.deleteHotel);
api.put("/updateHotel/:id", hotelController.editHotel);
api.put("/editRoom/:idHotel/:idRoom", hotelController.editRoom);
api.delete("/deleteRoom/:idRoom", hotelController.deleteRoom);
api.post("/addEvent/:idHotel", hotelController.addEvent);
api.put("/editEvent/:idHotel/:idEvent", hotelController.editEvent);
api.delete("/deleteEvent/:idEvent", hotelController.deleteEvent);
api.post("/addThing/:idHotel/:idRoom", hotelController.addThing);
api.put("/editThing/:idRoom/:idThing", hotelController.editThing);
api.delete("/deleteThing/:idThing", hotelController.deleteThing);

module.exports = api;
