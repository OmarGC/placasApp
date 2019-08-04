const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let usuario = new Schema({
    nombre: { type: String, required:true },
    correo: String,
    clave: String,
    
});

module.exports = mongoose.model('ususario', usuario);