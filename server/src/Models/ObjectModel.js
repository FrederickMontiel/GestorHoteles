"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var objetosHabitacion = Schema({
    nombreObjeto : String,
    descripcionObjeto : String,
    precioObjeto : Number,
    habitacionObjeto : { type: mongoose.Schema.Types.ObjectId, ref: 'hoteles.habitacionesHotel'}
});

module.exports = mongoose.model("objetos", objetosHabitacion);
