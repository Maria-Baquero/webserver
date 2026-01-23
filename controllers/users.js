const { response, request } = require('express');


const usersGet = (req = request, res = response) => {

    //leer informacion que viene en la url
    const {q, name, apikey, page, limit} = req.query;

    res.json({
        msg: 'get API - Controlador',
        q,
        name,
        apikey,
        page, 
        limit
    });
}


const usersPost = (req, res = response) => {

    //leer informacion json que viene en el body, peticion post
    const {name, age}= req.body;

    res.status(200).json({
        msg: 'post API - controller',
        name, 
        age
    });

    // Ó 
    /*
    const body = req.body;
        const user = new User(body);
    
        await user.save();
    
        res.json({
            
            user
        });
    */
}


const usersPut = (req, res = response) => {

    const id = req.params.id;

    res.json({
        msg: 'put API - controller',
        id
    });
}


const usersDelete = (req, res = response) => {
    res.json({
        msg: 'delete API - controller'
    });
}



const usersPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - controller'
    });
}



module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersDelete,
    usersPatch
}