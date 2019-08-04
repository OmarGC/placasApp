const { Router } = require('express');
const router = Router();
const cntrlPlaca = require('../controllers/placa.controller');

router.get('/', cntrlPlaca.getPlaca);
router.post('/', cntrlPlaca.postPlaca);
router.put('/:id', cntrlPlaca.updatePlaca);
router.delete('/:id', cntrlPlaca.deletePlaca);

module.exports = router;