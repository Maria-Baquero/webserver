const { Router } = require('express');
const {check} = require('express-validator');

const {categoryExistById} = require('../helpers');
const {validateFields, validateJWT, validateAdminRole} = require('../middlewares');
const { getCategories,
    getCategory,
    createCategory,
    putCategory,
    deleteCategory } = require('../controllers/categories');

const router = Router();



//obtener todas las categorias
router.get('/', getCategories);


//obtener categoria por id
router.get('/:id', [
    check('id', 'Id doesnt exist').custom(categoryExistById),
    validateFields
],getCategory);



//crear categoria - privado
router.post('/', [
    validateJWT,
    check('name','Name is required').not().isEmpty(),
    validateFields

], createCategory);



//Actualizar categoria - privado
router.put('/:id', [
    validateJWT,
    check('id').custom(categoryExistById),
    validateFields
], putCategory);


//borrar una categoria - admin
router.delete('/:id', [
    validateJWT,
    check('id', 'Is not a Mongo id valid').isMongoId(),
    check('id').custom(categoryExistById),
    validateAdminRole
], deleteCategory);





module.exports = router;