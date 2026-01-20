const { Schema, model } = require('mongoose');


//Para usar esto hemos creado en la bd (en Compass) la coleccion de roles(admin_rol, user_rol, etc)
const RoleSchema = Schema({
    rol: {
        type: String,
        required: [true, 'Role is required']
    }

});




module.exports = model('Role', RoleSchema);