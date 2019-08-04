const moongoose = require('mongoose')
const Schema = moongoose.Schema;

let placaSchema = new Schema({
    fecha: {type: Date, default: Date.now()},
    nombre: { type: String, required: true },
    imagen: { type: String, required: true },
    modelo: String,
});

module.exports = moongoose.model('placa', placaSchema);