const { response, request } = require('express');
const { Category, User } = require('../models');





//obtener categorias - paginado  - total categorias - populate
const getCategories = async (req = request, res = response) => {

    const { limit = 5, from=0 } = req.query;
    const query = { status: true }

    const [total, categories] = await Promise.all([
        Category.countDocuments(query),
        Category.find(query)
            .populate('user','name')
            .skip(Number(from))
            .limit(Number(limit))
    ]);


    res.json({
        total,
        categories
    });
}


//obtener categoria - populate {}
const getCategory = async (req = request, res = response) => {

    const { id } = req.params;
    const category = await Category
        .findById(id)
        .populate('user', 'name');

    res.json(category);
}



//crear categoria
const createCategory = async (req, res = response) => {

    //leemos el nombre del body
    const name = req.body.name.toUpperCase();

    //buscamos la categoria en la base de datos
    const categoryBD = await Category.findOne({ name });

    //si existe mandamos un error
    if (categoryBD) {
        return res.status(400).json({
            msg: `Category already exist`
        });
    }

    //generamos la data que vamos a grabar
    const data = {
        name,
        user: req.user._id  //el user debe ser un id de mongoDB y esta validado por un jwt
    }

    //creamos una nueva categoria con la data
    const category = new Category(data);

    //guardamos la categoria nueva
    await category.save();

    //devolvemos respuesta 
    res.status(201).json(category);

}


//actualizar categoria
const putCategory = async (req, res = response) => {

    const {id} = req.params;
    const {status, user, ...data} = req.body;

    data.name = data.name.toUpperCase();
    data.user = req.user._id;

    const category = await Category.findByIdAndUpdate(id, data, {new: true});

    res.json(category);
}




//eliminar categoria
const deleteCategory = async (req, res = response) => {

    const {id} = req.params;
    
    //esto es para probar codigo, no elimina, solo cambia status a false
    const categoryDelete = await Category.findByIdAndUpdate(id, {status: false}, {new: true});
    
    //esta linea si elimina la categoria
    // const categoryDelete = await Category.findByIdAndDelete(id);
    
    
    res.json(categoryDelete);
}





module.exports = {
    getCategories,
    getCategory,
    createCategory,
    putCategory,
    deleteCategory
}