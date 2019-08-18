const moongoose = require('mongoose')
const Schema = moongoose.Schema;

let placaSchema = new Schema({
    fecha: {type: Date, default: Date.now()},
    idUsuario: { type: String, required: true },
    nombre: { type: String, required: true },
    imagen: String,
    modelo: String,
});

module.exports = moongoose.model('placa', placaSchema);