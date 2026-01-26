const jwt = require('jsonwebtoken');
const { response, request } = require('express');
const User = require('../models/user');



//validacion de tokens
const validateJWT = async (req, res = response, next) => {

    const token = req.header('x-token');


    if (!token) {
        return res.status(401).json({
            msg: 'token not found'
        });
    }

    try {

        const { uid } = jwt.verify(token, process.env.SECRET_KEY);


        //leer el usuario que corresponde al uid
        const user = await User.findById(uid);


        if (!user) {
            return res.status(401).json({
                    msg: 'user doesnt exist'
                })
        }


        if (!user.status) {
            return res.status(401).json({
                msg: 'invalid token'
            });
        }


        req.user = user;

        next();

    } catch (error) {

        console.log(error);
        res.status(401).json({
            msg: 'Token invalid'
        });
    }



}


module.exports = {
    validateJWT
}