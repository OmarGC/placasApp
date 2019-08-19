const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const usuario = new Schema({
    nombre: { type: String, required:true },
    correo: String,
    telefono: Number,
    clave: String
    
});

module.exports = mongoose.model('Usuario', usuario);