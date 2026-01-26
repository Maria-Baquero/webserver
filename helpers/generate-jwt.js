const jwt = require('jsonwebtoken');



//uid = user identified = id del usuario
const generateJWT = (uid = '') => {

    return new Promise( (resolve, reject) => {

        const payload = {uid};

        jwt.sign(payload, process.env.SECRET_KEY, {
                //expiresIn: '4h'   //expiracion del token
        }, (error, token)=>{

            if(error){
                console.log(error);
                reject('An error occurred while generating the token.')
            }else{
                resolve(token);
            }

        })

    })

}


module.exports = {
    generateJWT
}