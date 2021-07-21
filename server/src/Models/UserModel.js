"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = Schema({
    apodoUsuario : String,
    nombreUsuario : String,
    correoUsuario : String,
    claveUsuario : String,
    fechaNacUsuario : Date,
    rolUsuario : String,
    hotelUsuario : {hotelUsuario:  {type: mongoose.Schema.Types.ObjectId, ref: 'hoteles' }},

    pedidosUsuario : [{
        fechaEntradaPedido : Date,
        fechaSalidaPedido : Date,
        fechaEmisionPedido : Date,
        habitacionPedido : { type: mongoose.Schema.Types.ObjectId, ref: 'hoteles.habitacionesHotel' },
    }],

    rolUsuario: { type: String, default: "CLIENT" },
});

module.exports = mongoose.model("usuarios", userSchema);
