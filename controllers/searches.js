const { response } = require("express");
const { ObjectId } = require('mongoose').Types;

const { User, Category, Product, Roles} = require('../models');

//colecciones permitidas 
const permittedCollections = [
    'users',
    'categories',
    'products',
    'roles'
];


const searchUsers = async ( term = '', res = response) => {

    /*el termino que pase el usuario en este caso será:
        - Un id de usuario
        - Un nombre de usuario
    */

    //- comprobamos que el termino sea un ID con formato de mongo
    const isMONGOID = ObjectId.isValid(term); //true


    if(isMONGOID){
        //si devuelve true, buscamos en bd el usuario con ese termino(id)
        const user = await User.findById(term);

        return res.json({ 
            results: ( user ) ? [ user ] : [] //pregunta si el usuario existe, si es true muestra los datos, si es false devuelve arreglo vacio
        })
    }


    //formateamos el termino para que sea insensible a mayusculas y minusculas
    const  regex = RegExp(term, 'i');

    //- buscamos al usuario por el termino - (nombre o correo)
    const users = await User.find({
        $or: [{ name: regex}, {email: regex}],
        $and: [{status: true}]
    });

    return res.json({ 
            results: users
    })
}




const searchCategories = async ( term = '', res = response) => {

    const isMONGOID = ObjectId.isValid(term); //true

    if(isMONGOID){
        const category = await Category.findById(term);

        return res.json({ 
            results: ( category ) ? [ category ] : [] //pregunta si la categoria existe, si es true muestra los datos, si es false devuelve arreglo vacio
        })
    }

    //formateamos el termino para que sea insensible a mayusculas y minusculas
    const  regex = RegExp(term, 'i');

    //- buscamos la categoria por el termino - (nombre)
    const categories = await Category.find({name: regex, status: true});

    return res.json({ 
            results: categories
    })
}




const searchProducts = async ( term = '', res = response) => {

    //- comprobamos que el termino sea un ID con formato de mongo
    const isMONGOID = ObjectId.isValid(term); //true

    if(isMONGOID){
        //buscamos el producto en la bd con el termino
        const product = await Product.findById(term);

        return res.json({ 
            results: ( product ) ? [ product ] : [] //pregunta si el producto existe, si es true muestra los datos, si es false devuelve arreglo vacio
        })
    }

    //formateamos el termino para que sea insensible a mayusculas y minusculas
    const  regex = RegExp(term, 'i');

    //- buscamos el producto por el termino - (nombre)
    const products = await Product.find({ name: regex, status:true})
                    .populate('category', 'name');

    return res.json({ 
            results: products
    })
}



//busqueda principal
const search = ( req, res = response) => {

    //comprobamos si la coleccion existe en las colecciones permitidas
    const { collection, term} = req.params;

    if(!permittedCollections.includes(collection)){
        return res.status(400).json({
            msg: `The permitted collections are: ${permittedCollections}`
        })
    }


    //busqueda segun coleccion
    switch (collection) {
        case 'users':
            searchUsers(term, res);

            break;

        case 'categories':
            searchCategories(term, res);
            
            break;

        case 'products':
            searchProducts(term, res);
            
            break;

        default:
            res.json({
                msg: 'this collection doesnt exist'
            })
            break;
    }


    /*res.json({
        collection, term
    })*/
}



module.exports = {
    search
}