"use strict";

var jwt = require("jwt-simple");
var moment = require("moment");
var secret = "secret_password";

exports.ensureAuth = function (req, res, next) {
    var jsonResponse = {};

    jsonResponse['data'] = null;
    jsonResponse['token'] = null;
    jsonResponse['error'] = null;

    if (!req.headers.authorization) {
        jsonResponse['status'] = 404;
        jsonResponse['error'] = "La peticion no tiene la cabecera en la Autenticacion";

        return res.status(200).send(jsonResponse);
    }

    var token = req.headers.authorization.replace(/['"]+/g, "");

    try {
        var payload = jwt.decode(token, secret);
        if (payload.exp <= moment().unix()) {
            jsonResponse['status'] = 403;
            jsonResponse['error'] = "El token ha experido";

            return res.status(200).send(jsonResponse);
        }
    } catch (error) {
        jsonResponse['status'] = 403;
        jsonResponse['error'] = "El token no es valido";
        
        return res.status(200).send({ message: "El token no es valido" });
    }

    req.user = payload;
    next();
};
