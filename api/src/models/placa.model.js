const moongoose = require('mongoose')
const Schema = moongoose.Schema;
require('../models/usuarios.model')

let placaSchema = new Schema({
    fecha: {type: Date, default: Date.now()},
    idUsuario: { type: Schema.Types.ObjectId, ref: 'Usuario' },
    nombre: { type: String, required: true },
    imagen: String,
    modelo: String,
});

module.exports = moongoose.model('Placa', placaSchema);