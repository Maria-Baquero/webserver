const { Router } = require('express');
const {check} = require('express-validator');
const { validateRol, validateEmail, userExistById } = require('../helpers');

const { usersGet,
    usersPost,
    usersPut,
    usersDelete,
    usersPatch
 } = require('../controllers/users');
 
const { validateFields, validateJWT, validateAdminRole, haveRole} = require('../middlewares'); //esto llama a /middlewares/index.js

const router = Router();

//--------------------------------------


router.get('/', usersGet );




//Los middlewares para validar van como segundo argumento,
//si se pasa mas de uno tendrá que ir como un arreglo (entre [])
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),

    check('password', 'Password must have 6 letters').isLength({min: 6}),

    //check('email', 'The email address is invalid').isEmail(),
    check('email').custom(validateEmail),

    //check('rol', 'rol is invalid').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom( validateRol ),

    validateFields

] ,usersPost);





router.put('/:id', [
    check('id', 'Not a valid ID').isMongoId(),

    check('id').custom( userExistById),

    check('rol').custom(validateRol),

    validateFields
],usersPut);





/*
//Esto de verdad elimina un usuario
router.delete('/:id', [
    check('id', 'Invalid ID').isMongoId(),
    check('id').custom(userExistById),
    validateFields
],usersDelete);

*/

//muestra el usuario despues de las validaciones con middlewares
router.delete('/:id', [
    validateJWT,                //el orden de los middlewares es el orden en el que se ejecutan en el sistema
    
    //validateAdminRole,   //este middleware  fuerza que el usuario tenga que ser admin
    
    haveRole('ADMIN_ROLE', 'VENTAS_ROLE'),   //este mdw fuerza que tenga que ser uno de estos roles
    
    check('id', 'error').isMongoId(),
    
    check('id','error').custom(userExistById),
    
    validateFields

],usersDelete);






router.patch('/:id', usersPatch);



module.exports = router;