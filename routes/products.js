const { Router } = require('express');
const {check} = require('express-validator');

const {productExistById, categoryExistById} = require('../helpers');
const {validateFields, validateJWT, validateAdminRole} = require('../middlewares');
const { getProducts,
    getProduct,
    createProduct,
    putProduct,
    deleteProduct } = require('../controllers/products')

const router = Router();



//obtener todos los productos
router.get('/', getProducts);


//obtener producto por id
router.get('/:id', [
   check('id', 'Id doesnt exist').custom(productExistById),
   validateFields

],getProduct);



//crear producto - privado
router.post('/', [
    validateJWT,
    check('name','Name is required').not().isEmpty(),
    check('category', 'Is not a Mongo Id').isMongoId(),
    check('category').custom(categoryExistById),
    validateFields

], createProduct);



//Actualizar producto - privado
router.put('/:id', [
    validateJWT,
    check('id').custom(productExistById),
    //check('category', 'Is not a Mongo Id').isMongoId(),
    validateFields
 
], putProduct);


//borrar un producto - admin
router.delete('/:id', [
    validateJWT,
    validateAdminRole,
    check('id', 'Is not a Mongo id valid').isMongoId(),
    check('id').custom(productExistById),
    validateFields

], deleteProduct);





module.exports = router;