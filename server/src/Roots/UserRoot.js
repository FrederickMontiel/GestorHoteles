"use strict";

var express = require("express");
var userController = require("../Controllers/UserController");

var md_autorizacion = require("../Middlewares/authentication");

var api = express.Router();
api.post("/user/register", userController.registrar);
api.post("/user/login", userController.login);

api.get("/user", md_autorizacion.ensureAuth, userController.obtenerUsuario);
api.get("/user/list", md_autorizacion.ensureAuth, userController.listUsers);
api.put("/user/:idUser", md_autorizacion.ensureAuth, userController.editUser);
api.post("/user/:idUser/request/:idRoom", userController.addRequest);
api.post("/request/list", md_autorizacion.ensureAuth, userController.listRequest);

api.delete("/deleteUser/:id", userController.deleteUser);
api.put("/addCalification/:idHotel", userController.addCalification);
api.put("/editCalification/:idHotel/:idCalificacion", userController.editCalification);
api.delete("/deleteCalification/:idHotel/:idCalificacion", userController.deleteCalification);
api.put("/editRequest/:idUser/:idRequest", userController.editRequest);
api.delete("/deleteRequest/:idUser/:idRequest", userController.deleteRequest);
api.post("/addAgregate", userController.addAgregate);
api.put("/editAgregate/:idAgregate", userController.editAgregate);
api.delete("/deleteAgregate/:idAgregate", userController.deleteAgregate);

module.exports = api;
