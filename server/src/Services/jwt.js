"use strict";

var jwt = require("jwt-simple");
var moment = require("moment");
var secret = "secret_password";

exports.createTokenAdmin = function (user) {
  var payload = {
    sub: user._id,
    apodoUsuario: user.apodoUsuario,
    nombreUsuario: user.nombreUsuario,
    correoUsuario: user.correoUsuario,
    claveUsusario: user.claveUsusario,
    fechaNacUsuario: user.fechaNacUsuario,
    rolUsuario: user.rolUsuario,
    iat: moment().unix(),
    exp: moment().day(10, "days").unix(),
  };
  return jwt.encode(payload, secret);
};
