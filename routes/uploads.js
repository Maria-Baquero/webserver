const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields, validateFiles } = require('../middlewares');
const { allowedCollections } = require('../helpers')
const { uploadFile, updateImg, showImg, updateImgCloudinary } = require('../controllers/uploads');

const router = Router();



//subir archivos
router.post('/', [validateFiles], uploadFile);


//actualizar imagenes
router.put('/:collection/:id', [
    validateFiles,
    check('id', 'Is not a Mongo ID').isMongoId(),
    check('collection').custom(c => allowedCollections(c, ['users', 'products'])),  //users es la coleccion y products el arreglo de colecciones
    validateFields
], updateImgCloudinary );
//], updateImg);




//mostrar imagenes
router.get('/:collection/:id', [
    check('id', 'Is not a Mongo ID').isMongoId(),
    check('collection').custom(c => allowedCollections(c, ['users', 'products'])), 
    validateFields
], showImg);





module.exports = router;