const { response } = require("express")


//validacion de un usuario admin
const validateAdminRole = (req, res = response, next) => {

    if(!req.user){
        return res.status(500).json({
            msg: 'The token has not been validated'
        })
    }

    const {rol, name} = req.user;

    if(rol != 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: `${name} is not administrator`
        })
    }
    

    next();

}


const haveRole = (...roles) => {

    return (req, res = response, next) => {

        if(!roles.includes(req.user.rol)){
            return res.status(401).json({
                msg: `Invalid roles: ${roles}`
            })
        }


        next();
    }
}



module.exports = {
    validateAdminRole,
    haveRole
}