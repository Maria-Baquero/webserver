

//estas variables contienen todos los metodos que hay en los archivos importados
const validFields = require('../middlewares/validate-fields');
const validJWT = require('../middlewares/validate-jwt');
const validRoles = require('../middlewares/validate-roles');

//por lo tanto se importaran todos los metodos que creemos
module.exports = {
    ...validFields,
    ...validJWT,
    ...validRoles
}