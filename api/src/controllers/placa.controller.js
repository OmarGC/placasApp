const ModelPlaca = require('../models/placa.model');
const { connect, disconnect } = require('../config/database');
const placa = {};

placa.getPlacas = async (req, res) => {
    try {
        await connect();
        let placas = await ModelPlaca.find();
        await disconnect();
        res.json(placas)
    } catch (error) {
        res.status(400).json(error)
    }
}

placa.getPlaca = async (req, res) => {
    try {
        await connect();
        let placa = await ModelPlaca.findById(req.params.id);
        await disconnect();
        res.json(placa)
    } catch (error) {
        res.status(400).json(error)
    }
}

placa.postPlaca = async (req, res) => {
    try {
        await connect();
        let PlacaNueva = new ModelPlaca({
            idUsuario: req.body.idUsuario,
            nombre: req.body.nombre,
            imagen: req.body.imagen,
            modelo: req.body.modelo
        });
        await PlacaNueva.save();
        await disconnect();
        res.status(200).send({
            message: 'Se creo una plca nueva'
        });
    } catch (error) {
        res.status(400).json(error);
    }
}

placa.updatePlaca = async (req, res) => {
    try {
        const { id } = req.params;
        await connect();
        let actualizaPlaca = await ModelPlaca.findOneAndUpdate(
            { _id: id },
            { $set: req.body },
            { new: true, sort: { $natural: -1 } }
        );
        await actualizaPlaca.save();
        res.json({
            message: `Placa ${id} actualizada`,
            actualizaPlaca
        })
    } catch (error) {
        res.status(400).json(error);
    }
}

placa.deletePlaca = async (req, res) => {
    const { id } = req.params;
    await connect();
    await ModelPlaca.findByIdAndRemove(id);
    await disconnect();
    res.json({
        message: `Placa ${id} eliminada!`
    });
}

module.exports = placa;