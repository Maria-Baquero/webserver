const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');


 



//Mostrar usuarios
const usersGet = async (req = request, res = response) => {

    //esto quiere decir que al mostrar los usuarios solo mostrará 5 
    const {limit = 0} = req.query;
    const query = {status: true}

    const users = await User.find(query)
        .limit(Number(limit));

    const total = await User.countDocuments(query);

    //Con promesas tarda menos en cargar, este es el mismo codigo: 
    /*
    const answer = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .limit(Number(limit))
    ]);

    res.json({ 
        answer
    });
    */

    res.json({ 
        total,
        users
    });
}




//Crear usuarios
const usersPost = async (req, res = response) => {


    //leer informacion json que viene en el body, peticion post
    const {name, email, password, rol} = req.body;
    const user = new User({name, email, password, rol});


    //Encriptar contraseña
    const salt = bcryptjs.genSaltSync();  //esto genera las vueltas que va a dar la contraseña para encriptarse, por defecto suele ser 10 
    //ahora hacemos el hash
    user.password = bcryptjs.hashSync(password, salt);


    //Guardar en BD
    await user.save();

    res.json({
        
        user
    });
}







//Actualizar usuarios
const usersPut = async(req, res = response) => {

    const { id }= req.params;

    //aqui excluimos los datos que no necesitamos o no queremos en este momento
    const { _id, password, google, ...data} = req.body;


    //validar con base de datos
    //si en los datos viene la contraseña la volvemos a encriptar
    if(password){
        const salt = bcryptjs.genSaltSync(); 
        data.password = bcryptjs.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate( id, data);

    res.json({ user });
}





const usersPatch = async(req = request, res = response) => {

    res.json({
        msg: 'patch API - controller',
    });
}





//Eliminar usuarios
/*
const usersDelete = async(req, res = response) => {
    const {id} = req.params;

    const users = await User.findByIdAndDelete( id );

    res.json({
        id
    });
}
*/

const usersDelete = async(req, res = response) => {
    const {id} = req.params;

    const user = await User.findByIdAndUpdate(id, {status: false});

    const userAuth = req.user;

    res.json({user});
}



module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete
}