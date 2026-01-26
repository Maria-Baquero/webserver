const { response, request } = require('express');
const { Product, User } = require('../models');
const { modelNames } = require('mongoose');





//obtener productos - paginado  - total categorias - populate
const getProducts = async (req = request, res = response) => {

    //obtenemos los parametros de la url
    const { limit = 5, from=0 } = req.query;

    //definimos que para la consulta status debe ser true
    const query = { status: true }


    //obtenems el total de propductos y los datos de todos los productos
    const [total, products] = await Promise.all([
        Product.countDocuments(query),
        //ademas añadira los datos como: nombre de usuario y nombre de categoria
        Product.find(query)
            .populate('user', 'name' )
            .populate('category', 'name' )
            .skip(Number(from))
            .limit(Number(limit))
    ]);


    res.json({
        total,
        products
    });
}


//obtener producto - populate {}
const getProduct = async (req = request, res = response) => {

    //obtenemos los datos
    const { id } = req.params;

    //buscamos el producto por su id y mostramos los datos junto al nombre de producto y de categoria
    const product = await Product.findById(id)
            .populate('category', 'name');

    res.json(product);
}



//crear producto
const createProduct = async (req, res = response) => {

    const { estado, user, ...body} = req.body;

    //buscamos el producto en la base de datos
    const productBD = await Product.findOne({ name: body.name });

    //si existe mandamos un error
    if (productBD) {
        return res.status(400).json({
            msg: `Product already exist: ${productBD}`
        });
    }

    //generamos la data que vamos a grabar
    const data = {
        ...body,
        name: body.name.toUpperCase(),
        user: req.user._id  
    }

    //creamos un producto con la data
    const product = new Product(data);

    //guardamos la categoria nueva
    await product.save();

    //devolvemos respuesta 
    res.status(201).json(product);

}


//actualizar producto
const putProduct = async (req, res = response) => {

    const {id} = req.params;
    const {status, user, available, ...data} = req.body;

    //si obtenemos el nombre en los datos lo ponemos en mayusculas
    if(data.name){
        data.name = data.name.toUpperCase();
        data.user = req.user._id;
    }

    //actualiza el producto que tiene ese id con los datos obtenidos
    const product = await Product.findByIdAndUpdate(id, data, {new: true});

    res.json(product);
}




//eliminar producto
const deleteProduct = async (req, res = response) => {

    const {id} = req.params;
    
    //esto es para probar codigo, no elimina, solo cambia status a false
    const productDelete = await Product.findByIdAndUpdate(id, {status: false}, {new: true});
    
    //esta linea si elimina el producto
    // const productDelete = await Product.findByIdAndDelete(id);
    
    
    res.json(productDelete);
}


module.exports = {
    getProducts,
    getProduct,
    createProduct,
    putProduct,
    deleteProduct
}