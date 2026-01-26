const { Router } = require('express');

const { search } = require('../controllers/searches');

const router = Router();

//ruta para busquedas
router.get('/:collection/:term', search);



module.exports = router;