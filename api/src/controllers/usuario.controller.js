const ModeloUsuario = require('../models/usuarios.model');
const { connect, disconnect } = require('../config/database');
const usuario = {};

usuario.listarUsuarios = async (req, res) => {
    try {
        await connect();
        let listaUsuarios = await ModeloUsuario.find();
        await disconnect();
        res.json(listaUsuarios);
    } catch (error) {
        res.status(400).json(error);
    }
}

usuario.agregarUsuario = async (req,res) => {
    try {
        await connect();
        let nuevoUsuario = new ModeloUsuario({
            nombre: req.body.nom,
            correo: req.boyd.correo,
            clave: req.body.clave
        })
       
        await nuevoUsuario.save();
        await disconnect();
        res.status(200).send({
            message: 'Registro correcto'
        })
    } catch (error) {
        res.status(400).json(error);
    }
};

usuario.actualizaUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        await connect();
        let actualiza = await ModeloUsuario.findOneAndUpdate(
            { _id: id },
            { $set: req.body },
            { new: true, sort: { $natural:-1 } }
        );
        await actualiza.save();
        await disconnect();
        return res.json({
            message: `Usuario ${id} actualizado`,
            update
          });
    } catch (error) {
        res.status(400).json(error);
    }
}

usuario.eliminaUsuario = async (req, res) => {
    const { id } = req.params;
    await connect();
    await ModeloUsuario.findByIdAndRemove(id);
    await disconnect();
    res.json({
      message: `Usuario ${id} eliminado`
    });
};

module.exports = usuario;
  