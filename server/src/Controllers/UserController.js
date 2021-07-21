"use strict";

const User = require("../Models/UserModel");
const Hotel = require("../Models/HotelModel");
const Agregate = require("../Models/AgregateModel");
var bcrypt = require("bcrypt-nodejs");
var jwt = require("../Services/jwt");

function obtenerUsuario(req, res){
    
    var usuario = req.user;

    var jsonResponse = {};
    jsonResponse['data'] = null;
    jsonResponse['token'] = null;
    jsonResponse['error'] = null;

    User.findById(usuario.sub, (err, userFinded) => {
        if(err){
            jsonResponse['status'] = 500;
            jsonResponse['error'] = "Error del servidor al buscar usuario.";

            return res.status(200).send(jsonResponse);
        }else{
            if (userFinded) {
                    jsonResponse['status'] = 200;
                    jsonResponse['data'] = userFinded;

                    return res.status(200).send(jsonResponse);
            } else {
                jsonResponse['status'] = 500;
                jsonResponse['error'] = "Usuario no encontrado";
                        
                return res.status(200).send(jsonResponse);
            }
        }
    });
}

function listRequest(req, res){
    var idUser = req.user.idUser;

    var jsonResponse = {};
    jsonResponse['data'] = null;
    jsonResponse['token'] = null;

    User.findById(idUser, (err, usuario) => {
        if(err){
            jsonResponse['status'] = 500;
            jsonResponse['error'] = "Error del servidor al buscar pedidos.";

            return res.status(200).send(jsonResponse);
        }else{
            if(usuario){
                jsonResponse['status'] = 200;
                jsonResponse['data'] = usuario;

                return res.status(200).send(jsonResponse);
            }else{
                jsonResponse['status'] = 404;
                jsonResponse['error'] = "No se ha podido encontrar el usuario";

                return res.status(200).send(jsonResponse);
            }
        }
    });
}

function registrar(req, res) {
    var userModel = new User();
    var params = req.body;

    var jsonResponse = {};
    jsonResponse['data'] = null;
    jsonResponse['token'] = null;
    jsonResponse['error'] = null;

    if (params.apodoUsuario && params.nombreUsuario && params.correoUsuario && params.fechaNacUsuario) {
        userModel.apodoUsuario = params.apodoUsuario;
        userModel.nombreUsuario = params.nombreUsuario;
        userModel.correoUsuario = params.correoUsuario;
        userModel.fechaNacUsuario = params.fechaNacUsuario;

        User.find({
            $or: [{ apodoUsuario: userModel.apodoUsuario }, { correoUsuario: userModel.correoUsuario }],
        }).exec((err, userFound) => {
            if(err){
                jsonResponse['status'] = 500;
                jsonResponse['error'] = "Error del servidor al registrar usuario.";

                return res.status(200).send(jsonResponse);
            } else{
                if (userFound && userFound.length >= 1) {
                    jsonResponse['status'] = 200;
                    jsonResponse['error'] = "El usuario ya existe";

                    return res.status(200).send(jsonResponse);
                } else {
                    bcrypt.hash(params.claveUsuario, null, null, (err, passwordEncrypted) => {
                        userModel.claveUsuario = passwordEncrypted;
                        userModel.save((err, registrar) => {
                            if(err){
                                jsonResponse['status'] = 500;
                                jsonResponse['error'] = "Error al guardar usuario";
                            }else{
                                if (registrar) {
                                    jsonResponse['status'] = 200;
                                    jsonResponse['data'] = registrar;
                                    jsonResponse['token'] = jwt.createTokenAdmin(registrar);
                                } else {
                                    jsonResponse['status'] = 500;
                                    jsonResponse['error'] = "No se ha podido registrar el usuario";
                                }
                            }

                            return res.status(200).send(jsonResponse);
                        });
                    });
                }
            }
        });
    } else {
        jsonResponse['status'] = 403;
        jsonResponse['error'] = "Debes de integrar todos los datos";

        return res.status(200).send(jsonResponse);
    }
}

function login(req, res) {
    var params = req.body;
    var jsonResponse = {};

    jsonResponse['data'] = null;
    jsonResponse['token'] = null;
    jsonResponse['error'] = null;

    User.findOne({ correoUsuario: params.correoUsuario }, (err, userFound) => {
        if (err) {
            jsonResponse['status'] = 500;
            jsonResponse['error'] = "Error del servidor al loguear usuario.";

            return res.status(200).send(jsonResponse);
        }else{
            if (userFound) {
                bcrypt.compare(params.claveUsuario, userFound.claveUsuario, (err, passVerified) => {
                    if (passVerified) {
                        jsonResponse['status'] = 200;
                        jsonResponse['data'] = userFound;
                        jsonResponse['token'] = jwt.createTokenAdmin(userFound);

                        return res.status(200).send(jsonResponse);
                    } else {
                        jsonResponse['status'] = 500;
                        jsonResponse['error'] = "Datos erroneos";

                        return res.status(200).send(jsonResponse);
                    }
                });
            } else {
                jsonResponse['status'] = 500;
                jsonResponse['error'] = "Error al buscar el usuario";
                        
                return res.status(200).send(jsonResponse);
            }
        }
    });
}

function listUsers(req, res) {
    var jsonResponse = {};
    var admin = req.user;

    if(admin.rolUsuario == "ADMIN"){
        jsonResponse['data'] = null;
        jsonResponse['token'] = null;

        User.find().exec((err, users) => {
            if(err){
                jsonResponse['status'] = 500;
                jsonResponse['error'] = "Error al buscar usuarios";

                return res.status(200).send(jsonResponse);
            }else{
                if (users && users.length > 0) {
                    jsonResponse['status'] = 200;
                    jsonResponse['data'] = users;

                    return res.status(200).send(jsonResponse);
                } else {
                    jsonResponse['status'] = 404;
                    jsonResponse['error'] = "No se encontraron usuarios";

                    return res.status(200).send(jsonResponse);
                }
            }
        });
    }else{
        jsonResponse['status'] = 403;
        jsonResponse['error'] = "No tienes permisos para ver este contenido";
        
        return res.status(200).send(jsonResponse);
    }
}

function editUser(req, res) {
    var params = req.body;
    var idUsuario = req.params.idUser;
    
    var jsonResponse = {};
    
    jsonResponse['data'] = null;
    jsonResponse['token'] = null;
    jsonResponse['error'] = null;

    if(req.user.sub == idUsuario || req.user.rolUsuario == "ADMIN"){
        if(req.user.rolUsuario == "CLIENT"){
            delete params.apodoUsuario;
            delete params.fechaNacUsuario;
        }

        User.findById(idUsuario, (err, userFinded) => {
            if(err){
                jsonResponse['status'] = 500;
                jsonResponse['error'] = "Error al buscar el usuario asociado";

                return res.status(200).send(jsonResponse);
            }else{
                if(userFinded){
                    if((req.user.rolUsuario == "CLIENT" && bcrypt.compareSync(params.claveUsuario, userFinded.claveUsuario)) || req.user.rolUsuario == "ADMIN"){
                        //res.status(200).send(userFinded);

                        if(req.user.rolUsuario == "CLIENT"){
                            delete params.claveUsuario;
                        }
                        
                        User.findByIdAndUpdate(idUsuario, params, { new: true },
                            (err, userUpdate) => {
                                if(!err){
                                    if (userUpdate) {
                                        delete userUpdate.claveUsuario;
                                        
                                        jsonResponse['status'] = 200;
                                        jsonResponse['data'] = userUpdate;
                                        jsonResponse['token'] = jwt.createTokenAdmin(userUpdate);

                                        return res.status(200).send(jsonResponse);
                                    } else {
                                        jsonResponse['status'] = 404;
                                        jsonResponse['error'] = "Usuario no encontrado para editar";
                    
                                        return res.status(200).send(jsonResponse);
                                    }
                                }else{
                                    jsonResponse['status'] = 500;
                                    jsonResponse['error'] = "Error del servidor al editar usuario";
                
                                    return res.status(200).send(jsonResponse);
                                }
                            }
                        );
                    }else{
                        jsonResponse['status'] = 403;
                        jsonResponse['error'] = "Contraseña para confirmar incorrecta";
                    
                        return res.status(200).send(jsonResponse);
                    }
                
                }else{
                    jsonResponse['status'] = 404;
                    jsonResponse['error'] = "Usuario no encontrado";
                
                    return res.status(200).send(jsonResponse);
                }
                
            }
        });

    }else{
        jsonResponse['status'] = 403;
        jsonResponse['error'] = "No tienes permisos para editar este usuario";
                
        return res.status(200).send(jsonResponse);
    }
    
}

function deleteUser(req, res) {
    var idUser = req.params.id;
    var params = req.body;

    User.findByIdAndDelete(idUser, (err, userDeleted) => {
        if (err) return res.status(500).send({ message: "Error en la peticion" });

        if (!userDeleted) return res.status(500).send({ message: "No se pudo eliminar el usuario" });

        return res.status(200).send({ message: "El usuario se elimino con exito" });
    });
}

function addCalification(req, res){
    var idHotel = req.params.idHotel;
    var params = req.body;
    
    Hotel.findOneAndUpdate({
        _id : idHotel
    }, {
        $push : {
            calificacionesHotel : {
                usuarioCalificacion : params.usuarioCalificacion,
                numeroCalificacion : params.numeroCalificacion
            }
        }
    }
    ,{ new: true }, 
    (err, calificacion) => {
        if(err){
            res.status(500).send(err);
        }else{
            res.status(200).send(calificacion);
        }
    });
}

function editCalification(req, res){
    var idHotel = req.params.idHotel;
    var idCalificacion = req.params.idCalificacion;
    var params = req.body;
    var dataUpdate = {};

    if(params.numeroCalificacion) dataUpdate['calificacionesHotel.$.numeroCalificacion'] = params.numeroCalificacion;
    
    Hotel.findOneAndUpdate({
        _id : idHotel,
        "calificacionesHotel._id" : idCalificacion,
        "calificacionesHotel.usuarioCalificacion" : params.usuarioCalificacion,
    }, 
    dataUpdate,
    { new: true, useFindAndModify: false }, 
    (err, calificacion) => {
        if(err){
            res.status(500).send(err);
        }else{
            if(calificacion){
                res.status(200).send(calificacion);
            }else{
                res.status(404).send("No encontrado");
            }
        }
    });
}

function deleteCalification(req, res){
    var idHotel = req.params.idHotel;
    var idCalificacion = req.params.idCalificacion;

    Hotel.findOneAndUpdate({
        _id : idHotel,
        "calificacionesHotel._id" : idCalificacion
    }, 
    {
        $pull : {
            calificacionesHotel : {
                _id : idCalificacion
            }
        }
    },
    { new: true, useFindAndModify: false }, 
    (err, calificacion) => {
        if(err){
            res.status(500).send(err);
        }else{
            if(calificacion){
                res.status(200).send(calificacion);
            }else{
                res.status(404).send("No encontrado");
            }
        }
    });
}

function addRequest(req, res){
    var idUser = req.params.idUser;
    var idRoom = req.params.idRoom;
    var params = req.body;
    var jsonResponse = {};
    
    jsonResponse['data'] = null;
    jsonResponse['token'] = null;
    jsonResponse['error'] = null;
    
    User.findOneAndUpdate({
        _id : idUser
    }, {
        $push : {
            pedidosUsuario : {
                fechaEntradaPedido : params.fechaEntradaPedido,
                fechaSalidaPedido : params.fechaSalidaPedido,
                fechaEmisionPedido : params.fechaEmisionPedido,
                habitacionPedido : idRoom
            }
        }
    }
    ,{ new: true }, 
    (err, calificacion) => {
        if(err){
            jsonResponse['status'] = 500;
            jsonResponse['error'] = "Error en la consulta al agregar habitacion asociado";

            return res.status(200).send(jsonResponse);
        }else{
            if(calificacion){
                delete calificacion.claveUsuario;
                jsonResponse['status'] = 200;
                jsonResponse['data'] = calificacion;

                return res.status(200).send(jsonResponse);
            }else{
                jsonResponse['status'] = 404;
                jsonResponse['error'] = "No se encontro el usuario";

                return res.status(200).send(jsonResponse);
            }
        }
    });
}

function editRequest(req, res){
    var idUser = req.params.idUser;
    var idRequest = req.params.idRequest;
    var params = req.body;
    var dataUpdate = {};

    if(params.fechaEntradaPedido) dataUpdate['pedidosUsuario.$.fechaEntradaPedido'] = params.fechaEntradaPedido;
    if(params.fechaSalidaPedido) dataUpdate['pedidosUsuario.$.fechaSalidaPedido'] = params.fechaSalidaPedido;
    if(params.fechaEmisionPedido) dataUpdate['pedidosUsuario.$.fechaEmisionPedido'] = params.fechaEmisionPedido;
    
    User.findOneAndUpdate({
        _id : idUser,
        "pedidosUsuario._id" : idRequest,
        "pedidosUsuario.habitacionPedido" : params.habitacionPedido
    }, 
    dataUpdate,
    { new: true, useFindAndModify: false }, 
    (err, calificacion) => {
        if(err){
            res.status(500).send(err);
        }else{
            if(calificacion){
                res.status(200).send(calificacion);
            }else{
                res.status(404).send("No encontrado");
            }
        }
    });
}

function deleteRequest(req, res){
    var idUser = req.params.idUser;
    var idRequest = req.params.idRequest;

    User.findOneAndUpdate({
        _id : idUser,
        "pedidosUsuario._id" : idRequest
    }, 
    {
        $pull : {
            pedidosUsuario : {
                _id : idRequest
            }
        }
    },
    { new: true, useFindAndModify: false }, 
    (err, calificacion) => {
        if(err){
            res.status(500).send(err);
        }else{
            if(calificacion){
                res.status(200).send(calificacion);
            }else{
                res.status(404).send("No encontrado");
            }
        }
    });
}

function addAgregate(req, res){
    var params = req.body;

    var agregar = new Agregate({
        cantidadAgregado : params.cantidadAgregado,
        objetoAgregado : params.objetoAgregado,
        pedidoAgregado : params.pedidoAgregado
    });

    agregar.save((err, agregado) => {
        if(err){
            res.status(500).send(err);
        }else{
            if(agregado){
                res.status(200).send(agregado);
            }else{
                res.status(404).send("No encontrado");
            }
        }
    });
}

function editAgregate(req, res){
    var idAgregado = req.params.idAgregate;
    var params = req.body;

    Agregate.findByIdAndUpdate(idAgregado, params, {new: true}, (err, agregado) => {
        if(err){
            res.status(500).send(err);
        }else{
            if(agregado){
                res.status(200).send(agregado);
            }else{
                res.status(404).send("No encontrado");
            }
        }
    });
}

function deleteAgregate(req, res){
    var idAgregado = req.params.idAgregate;

    Agregate.findByIdAndDelete(idAgregado, (err, agregado) => {
        if(err){
            res.status(500).send(err);
        }else{
            if(agregado){
                res.status(200).send(agregado);
            }else{
                res.status(404).send("No encontrado");
            }
        }
    });
}

module.exports = {
    login,
    editUser,
    registrar,
    listUsers,
    deleteUser,
    addRequest,
    editRequest,
    deleteRequest,
    addCalification,
    editCalification,
    deleteCalification,
    addAgregate,
    editAgregate,
    deleteAgregate,
    obtenerUsuario,
    listRequest
};