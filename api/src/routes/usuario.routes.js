const { Router } = require('express');
const router = Router();
const cntrlUsuario = require('../controllers/usuario.controller');

router.get('/', cntrlUsuario.listarUsuarios);
router.post('/add', cntrlUsuario.agregarUsuario);
router.put('/:id', cntrlUsuario.actualizaUsuario);
router.delete('/:id', cntrlUsuario.eliminaUsuario);

module.exports = router;