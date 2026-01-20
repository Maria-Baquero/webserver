const Role = require('../models/role');
const User = require('../models/user');

//validamos el rol
const validateRol = async (rol = '') => {

    const existsRol = await Role.findOne({ rol });

    if (!existsRol) {
        throw new Error(`Rol ${rol} is not registered on database`)
    }
}

//verificar si el email existe
const validateEmail = async (email = '') => {
    const existsEmail = await User.findOne({email});
        if (existsEmail){
            throw new Error(`Email: ${email}, is registered`)
        }
}



const userExistById = async(id) =>{

    const userExists = await User.findById(id);
    if(!userExists){
        throw new Error(`El id no existe: ${id}`);
    }
}









module.exports = {
    validateRol,
    validateEmail,
    userExistById
}