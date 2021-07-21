"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var hotelSchema = Schema({
    nombreHotel : String,
    imagenHotel : String,
    descripcionHotel : String,
    pbxHotel : String,
    paisHotel : String,
    cpHotel : String,
    direccionHotel : String,

    calificacionesHotel : [{
        usuarioCalificacion : { type: mongoose.Schema.Types.ObjectId, ref: 'usuarios' },
        numeroCalificacion : Number
    }],

    habitacionesHotel : [{
        descripcionHabitacion : String,
        categoriaHabitacion : String,
        costoHabitacion : Number,
    }],

    eventosHotel : [{
        nombreEvento : String,
        descripcionEvento : String,
        fechaHoraEvento : Date,
        maximoEvento : Number
    }]
});

module.exports = mongoose.model("hoteles", hotelSchema);
