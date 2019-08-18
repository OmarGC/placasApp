const { Router } = require('express');
const router = Router();
const cntrlPlaca = require('../controllers/placa.controller');

router.get('/', cntrlPlaca.getPlacas);
router.post('/', cntrlPlaca.postPlaca);
router.get('/:id', cntrlPlaca.getPlaca);
router.put('/:id', cntrlPlaca.updatePlaca);
router.delete('/:id', cntrlPlaca.deletePlaca);

module.exports = router;