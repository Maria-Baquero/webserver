const { response } = require("express");



//validar archivos
const validateFiles = (req, res = response, next) => {

    //comprobamos que el archivo se manda y no esta vacio
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archives) {
        return res.status(400).json({ 
            msg: 'No files were uploaded. - validateFiles' 
        });
    }

    next();
}


module.exports = {
    validateFiles
}