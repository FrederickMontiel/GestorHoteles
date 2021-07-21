// IMPORTS
const mongoose = require("mongoose");
const app = require("./app");
const User = require("./src/Models/UserModel");
const bcrypt = require("bcrypt-nodejs");

mongoose.Promise = global.Promise;
//mongoose.set('useFindAndModify', false);
mongoose
    .connect("mongodb://localhost:27017/dbGestorHoteles", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Se encuentra conectado a la base de datos");

        app.listen(3000, function () {
            console.log("Servidor corriendo en el puerto 3000");

            defaultUserAdmin();
            defaultUserClient();
        });
    })
    .catch((err) => console.log(err));

function defaultUserAdmin(req, res) {
    User.findOne({
        apodoUsuario: "ADMIN",
    }).exec((err, userData) => {
        if (userData) {
            console.log("Admin por defecto ya creado");
        } else {
            var userModel = new User({
                nombreAdmin: "ADMIN",
                apodoUsuario: "ADMIN",
                correoUsuario: "ADMIN@email.com",
                claveUsuario: bcrypt.hashSync("123456"),
                rolUsuario: "ADMIN",
            });
            userModel.save();
            console.log("Usuario ADMIN creado con exito");
        }
    });
}

function defaultUserClient(req, res) {
    User.findOne({
        apodoUsuario: "CLIENT",
    }).exec((err, userData) => {
        if (userData) {
            console.log("Usuario por defecto ya creado");
        } else {
            var userModel = new User({
                nombreAdmin: "CLIENT",
                apodoUsuario: "CLIENT",
                correoUsuario: "CLIENT@email.com",
                claveUsuario: bcrypt.hashSync("123456"),
                rolUsuario: "CLIENT",
            });
            userModel.save();
            console.log("Usuario CLIENT creado con exito");
        }
    });
}
