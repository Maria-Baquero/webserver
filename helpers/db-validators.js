const {Role, User, Category, Product} = require('../models');


//validamos el rol
const validateRol = async (rol = '') => {

    const existsRol = await Role.findOne({ rol });

    if (!existsRol) {
        throw new Error(`Rol ${rol} is not registered on database`)
    }

    return true;
}

//verificar si el email existe
const validateEmail = async (email = '') => {
    const existsEmail = await User.findOne({email});
        if (existsEmail){
            throw new Error(`Email: ${email}, is registered`)
        }

        return true;
}


//comprobamos si existe el usuario por el id
const userExistById = async(id) =>{

    const userExists = await User.findById(id);
    if(!userExists){
        throw new Error(`User doesnt exist: ${id}`);
    }

    return true;
}


//comprobamos si existe la cateogiria por el id
const categoryExistById = async(id) =>{
    const categoryExist = await Category.findById(id);
    if(!categoryExist){
        throw new Error(`Category doesnt exist: ${id}`)
    }

    return true;
}


//comprobamos si existe el producto por el id
const productExistById = async(id) =>{
    const productExist = await Product.findById(id);

    if(!productExist){
        throw new Error(`Product doesnt exist: ${id}`)
    }

    return true;
}



//validamos las colecciones permitidas para actualizar imagenes
const allowedCollections = (collection = '', collections = []) => {

    const collectionInclude = collections.includes(collection);

    if(!collectionInclude){
        throw new Error(`The collection ${collection} is not allowed, ${collections}`);
    }

    return true;
}



module.exports = {
    validateRol,
    validateEmail,
    userExistById,
    categoryExistById,
    productExistById,
    allowedCollections
}