"use strict";

var Hotel = require("../Models/HotelModel");
var User = require("../Models/UserModel");
var Objects = require("../Models/ObjectModel");
const { param } = require("../Roots/UserRoot");

function addHotel(req, res) {
    var hotelModel = new Hotel();

    var params = req.body;

    var jsonResponse = {};
    
    jsonResponse['data'] = null;
    jsonResponse['error'] = null;

    if(
        params.nombreHotel && 
        params.imagenHotel && 
        params.descripcionHotel && 
        params.paisHotel && 
        params.pbxHotel && 
        params.cpHotel && 
        params.direccionHotel &&
        params.idUsuario &&
        req.user.rolUsuario == "ADMIN"
    ){
        hotelModel.nombreHotel = params.nombreHotel;
        hotelModel.descripcionHotel = params.descripcionHotel;
        hotelModel.imagenHotel = params.imagenHotel;
        hotelModel.paisHotel = params.paisHotel;
        hotelModel.pbxHotel = params.pbxHotel;
        hotelModel.cpHotel = params.cpHotel;
        hotelModel.direccionHotel = params.direccionHotel;

        hotelModel.save((err, hotel) => {
            if(err){
                jsonResponse['status'] = 500;
                jsonResponse['error'] = "Error en el servidor al realizar la consulta";
                
                return res.status(200).send(jsonResponse);
            }else{
                User.findByIdAndUpdate(params.idUsuario, {hotelUsuario : params.idUsuario}, (err, usuario) => {
                    if(err){
                        jsonResponse['status'] = 500;
                        jsonResponse['error'] = "Error en el servidor al realizar la consulta";
                        
                        return res.status(200).send(jsonResponse);
                    }else{
                        if(usuario){
                            jsonResponse['status'] = 200;
                            jsonResponse['data'] = {user: usuario, hotel: hotel};
        
                            return res.status(200).send(jsonResponse);
                        }else{
                            jsonResponse['status'] = 500;
                            jsonResponse['error'] = "Error en el servidor al realizar la consulta";
                            
                            return res.status(200).send(jsonResponse);
                        }
                    }
                });
            }
        });
    }else{
        jsonResponse['status'] = 500;
        jsonResponse['error'] = "Faltan datos";
        
        return res.status(200).send(jsonResponse);
    }
}

function searchRoom(req, res) {
    var idRoom = req.params.idRoom;
    var idHotel = req.params.idHotel;

    var jsonResponse = {};
    
    jsonResponse['data'] = null;
    jsonResponse['error'] = null;

    Hotel.findOne({_id : idHotel, "habitacionesHotel.id" : idRoom}, (err, room) => {
        if(err){
            jsonResponse['status'] = 500;
            jsonResponse['error'] = "Error en el servidor al realizar la consulta";

            return res.status(200).send(jsonResponse);
        }else{
            if(room){
                jsonResponse['status'] = 200;
                jsonResponse['data'] = room;

                return res.status(200).send(jsonResponse);
            }else{
                jsonResponse['status'] = 404;
                jsonResponse['error'] = "Hotel no encontrado";

                return res.status(200).send(jsonResponse);
            }
        }
    });
}

function verifyRoom(req, res) {
    var idRoom = req.params.idRoom;

    var jsonResponse = {};
    
    jsonResponse['data'] = null;
    jsonResponse['error'] = null;

    User.find({"pedidosUsuario.habitacionPedido" : idRoom}, (err, rooms) => {
        if(err){
            jsonResponse['status'] = 500;
            jsonResponse['error'] = "Error en el servidor al realizar la consulta";

            return res.status(200).send(jsonResponse);
        }else{
            if(rooms && rooms.length > 0){
                jsonResponse['status'] = 200;
                jsonResponse['data'] = rooms;

                return res.status(200).send(jsonResponse);
            }else{
                jsonResponse['status'] = 404;
                jsonResponse['error'] = "No reservado";

                return res.status(200).send(jsonResponse);
            }
        }
    });
}

function addRooms(req, res) {
    var hotelId = req.params.idHotel;
    var params = req.body;

    Hotel.findByIdAndUpdate(
        hotelId,
        {
            $push: {
                habitacionesHotel: {
                    descripcionHabitacion: params.descripcionHabitacion,
                    categoriaHabitacion: params.categoriaHabitacion,
                    costoHabitacion: params.costoHabitacion
                }
            }
        },
        { new: true },
        (err, roomSaved) => {
            if (err) return res.status(500).send({ message: "Error en la peticion de Habitaciones" });
            if (!roomSaved) return res.status(500).send({ message: "Error al guerdar la habitacion" });
            return res.status(200).send({ roomSaved });
        }
    );
}

function buscarHoteles(req, res){
    var params = req.body;
    var jsonResponse = {};
    
    jsonResponse['data'] = null;
    jsonResponse['error'] = null;

    Hotel.aggregate([{ $match : {"nombreHotel" : { $regex: params.nombreHotel, $options: 'i' } }}, { $sort: { "createdTime" : -1 }} ]).exec((err, dataHotel) => {
        if (err){
            jsonResponse['status'] = 500;
            jsonResponse['error'] = "Error al buscar el hoteles asociados";

            return res.status(200).send(jsonResponse);
        }else{
            if (!dataHotel) {
                jsonResponse['status'] = 500;
                jsonResponse['error'] = "No se encontro el hotel";

                return res.status(200).send(jsonResponse);
            }else{
                jsonResponse['status'] = 200;
                jsonResponse['data'] = dataHotel;

                return res.status(200).send(jsonResponse);
            }
        }
    });
}

function getHotel(req, res){
    var idHotel = req.params.idHotel;
    var jsonResponse = {};
    
    jsonResponse['data'] = null;
    jsonResponse['error'] = null;

    Hotel.findById(idHotel, (err, dataHotel) => {
        if (err){
            jsonResponse['status'] = 500;
            jsonResponse['error'] = "Error al buscar el hoteles asociados";

            return res.status(200).send(jsonResponse);
        }else{
            if (!dataHotel) {
                jsonResponse['status'] = 500;
                jsonResponse['error'] = "No se encontro el hotel";

                return res.status(200).send(jsonResponse);
            }else{
                jsonResponse['status'] = 200;
                jsonResponse['data'] = dataHotel;

                return res.status(200).send(jsonResponse);
            }
        }
    });
}

function listarHoteles(req, res) {
    Hotel.find().exec((err, hotels) => {
        var jsonResponse = {};
        if (err){
            jsonResponse['status'] = 500;
            jsonResponse['data'] = null;
            jsonResponse['error'] = "Error del servidor en la peticion obtener hoteles";
        }else{
            if (!hotels){
                jsonResponse['status'] = 404;
                jsonResponse['data'] = null;
                jsonResponse['error'] = "No se encontro ningun hotel";
            }else{
                jsonResponse['status'] = 200;
                jsonResponse['data'] = hotels;
                jsonResponse['error'] = false;
            }
        }

        return res.status(200).send(jsonResponse);
    });
}

function deleteHotel(req, res) {
    var id = req.params.id;

    Hotel.findByIdAndDelete(id, (err, hotelDelete) => {
        if (err) return res.status(500).send({ message: "Error en la peticion" });

        if (!hotelDelete) return res.status(500).send({ message: "No se pudo eliminar el hotel" });

        return res.status(200).send({ message: "Hotel eliminado con exito" });
    });
}

function editHotel(req, res) {
    var id = req.params.id;
    var params = req.body;

    Hotel.findByIdAndUpdate(id, params, { new: true}, (err, hotelUpdate) => {
        if (err) return res.status(500).send({ message: "Error en la peticion de hoteles" });

        if (!hotelUpdate) return res.status(500).send({ message: "No se encontro ese hotel" });

        return res.status(200).send({ hotelUpdate });
    });
}

function editRoom(req, res) {
    var idHotel = req.params.idHotel;
    var idRoom = req.params.idRoom;

    var params = req.body;
    var dataUpdate = {};

    if (params.categoriaHabitacion) dataUpdate["habitacionesHotel.$.categoriaHabitacion"] = params.categoriaHabitacion;
    if (params.descripcionHabitacion) dataUpdate["habitacionesHotel.$.descripcionHabitacion"] = params.descripcionHabitacion;
    if (params.costoHabitacion) dataUpdate["habitacionesHotel.$.costoHabitacion"] = params.costoHabitacion;

    Hotel.findOneAndUpdate({ _id: idHotel, "habitacionesHotel._id": idRoom }, dataUpdate, { new: true, useFindAndModify: false }, (err, roomUpdate) => {
        if (err) return res.status(500).send({ message: "Error en la peticon de la habitacion" });

        if (!roomUpdate) return res.status(500).send({ message: "Error al editar habitacion" });

        return res.status(200).send({ roomUpdate });
    });
}

function deleteRoom(req, res) {
    var idRoom = req.params.idRoom;

    Hotel.findOneAndUpdate({"habitacionesHotel._id": idRoom }, { $pull: { habitacionesHotel: { _id: idRoom } } }, { new: true }, (err, roomDeleted) => {
        if (err) return res.status(500).send({ message: err });

        if (!roomDeleted) return res.status(500).send({ message: "Error al eliminar habitacion" });

        return res.status(200).send(roomDeleted);
    });
}

function addEvent(req, res) {
    var idHotel = req.params.idHotel;
    var params = req.body;

    Hotel.findByIdAndUpdate(
        idHotel,
        {
            $push: {
                eventosHotel: {
                    nombreEvento: params.nombreEvento,
                    descripcionEvento: params.descripcionEvento,
                    fechaHoraEvento: params.fechaHoraEvento,
                    maximoEvento: params.maximoEvento,
                },
            },
        },
        { new: true, useFindAndModify :false },
        (err, eventSaved) => {
            if (err) return res.status(500).send({ message: "Error en la peticion agregar evento" });

            console.log(eventSaved);

            if (!eventSaved) return res.status(500).send({ message: "Error al guardar evento" });

            return res.status(200).send({ eventSaved });
        }
    );
}

function editEvent(req, res) {
    var idHotel = req.params.idHotel;
    var idEvent = req.params.idEvent;
    var params = req.body;
    var dataUpdate = {};

    if (params.nombreEvento) dataUpdate["eventosHotel.$.nombreEvento"] = params.nombreEvento;
    if (params.descripcionEvento) dataUpdate["eventosHotel.$.descripcionEvento"] = params.descripcionEvento;
    if (params.fechaHoraEvento) dataUpdate["eventosHotel.$.fechaHoraEvento"] = params.fechaHoraEvento;
    if (params.maximoEvento) dataUpdate["eventosHotel.$.maximoEvento"] = params.maximoEvento;

    Hotel.findOneAndUpdate({ _id: idHotel, "eventosHotel._id": idEvent }, dataUpdate, { new: true }, (err, eventUpdate) => {
        if (err) return res.status(500).send({ message: "Error en la peticion de eventos" });

        if (!eventUpdate) return res.status(500).send({ message: "Erro al editar evento" });

        return res.status(200).send({ eventUpdate });
    });
}

function deleteEvent(req, res) {
    var idEvent = req.params.idEvent;

    Hotel.findOneAndUpdate({ "eventosHotel._id": idEvent }, { $pull: { eventosHotel: { _id: idEvent } } }, { new: true }, (err, eventDeletd) => {
        if (err) return res.status(500).send({ message: "Erro en la peticion hotel" });

        if (!eventDeletd) return res.status(500).send({ message: "Error al eliminar comentario" });

        return res.status(200).send({ eventDeletd });
    });
}

function addThing(req, res){
    var idHotel = req.params.idHotel;
    var idRoom = req.params.idRoom;
    var params = req.body;

    Hotel.findOne(
        { 
            _id : idHotel,
            "habitacionesHotel._id" : idRoom
        },
        {
            "habitacionesHotel.$" : 1
        },
        (err, hotel) => {
            if (err){
                return res.status(500).send({ message: "Error en la peticion de Habitaciones" });
            }else{
                var objeto = new Objects({
                    nombreObjeto : params.nombreObjeto,
                    descripcionObjeto : params.descripcionObjeto,
                    precioObjeto : params.precioObjeto,
                    habitacionObjeto : hotel.habitacionesHotel[0]._id
                });

                objeto.save((err, objeto) => {
                    if (err){
                        console.log(err);
                        return res.status(500).send({ message: "Error en la peticion al agregar un objeto" });
                    }else{
                        return res.status(200).send({ objeto });
                    }
                });
            }
        }
    );
}

function editThing(req, res){
    var idRoom = req.params.idRoom;
    var idObject = req.params.idThing;
    var params = req.body;
    delete params.habitacionObjeto;

    //params._id = idObject;
    
    Objects.findOneAndUpdate(
        { 
            _id : idObject,
            habitacionObjeto: idRoom
        },
        params,
        { new: true, useFindAndModify: false },
        (err, objeto) => {
            if (err){
                console.log(err);
                return res.status(500).send({ message: "Error en la peticion de Habitaciones" });
            }else{
                return res.status(200).send({ objeto });
            }
        }
    );
}

function deleteThing(req, res){
    var idObject = req.params.idThing;
    
    Objects.findByIdAndDelete(
        idObject,
        (err, objeto) => {
            if (err){
                console.log(err);
                return res.status(500).send({ message: "Error en la peticion de Habitaciones" });
            }else{
                return res.status(200).send({ status: "Eliminado correctamente", objeto });
            }
        }
    );
}

module.exports = {
    addHotel,
    addRooms,
    buscarHoteles,
    listarHoteles,
    deleteHotel,
    editHotel,
    editRoom,
    deleteRoom,
    addEvent,
    editEvent,
    deleteEvent,
    addThing,
    editThing,
    deleteThing,
    getHotel,
    searchRoom,
    verifyRoom
};
