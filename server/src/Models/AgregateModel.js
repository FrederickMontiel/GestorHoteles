"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var agregadorPedidos = Schema({
    cantidadAgregado : Number,
    objetoAgregado : { type: mongoose.Schema.Types.ObjectId, ref: 'objetos' },
    pedidoAgregado : { type: mongoose.Schema.Types.ObjectId, ref: 'usuarios.pedidosUsuario' }
});

module.exports = mongoose.model("agregados", agregadorPedidos);
