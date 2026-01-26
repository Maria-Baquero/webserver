const path = require('path');
const fs = require('fs');

const { response } = require("express");
const { uploadFiles } = require('../helpers');

//cloudinary
const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL);




const { User, Product } = require('../models');


//cargar archivo 
const uploadFile = async (req, res = response) => {

    try {
        //aqui estamos sobreescribiendo el formato de los archivos y la carpeta donde se guardaran
        const fullPath = await uploadFiles(req.files, ['txt', 'md'], 'texts');

        res.json({
            fullPath
        })

    } catch (msg) {
        res.status(400).json({ msg });
    }
}







//ESTA NO SE USA
//actualizar imagen
const updateImg = async (req, res = response) => {

    const { id, collection } = req.params;

    let model;

    switch (collection) {
        case 'users':

            model = await User.findById(id);

            if (!model) {
                return res.status(400).json({
                    msg: 'this id doesnt exist'
                })
            }

            break;

        case 'products':

            model = await Product.findById(id);

            if (!model) {
                return res.status(400).json({
                    msg: 'this product doesnt exist'
                })
            }

            break;

        default:
            return res.status(500).json({ msg: 'esto no esta terminado' })
            break;
    }


    //limpiar imagenes previas
    if (model.img) {
        //borrar img del servidor
        const pathImg = path.join(__dirname, '../uploads', collection, model.img);

        if (fs.existsSync(pathImg)) {
            fs.unlinkSync(pathImg);
        }

    }

    //subir imagen nueva
    const fullPath = await uploadFiles(req.files, undefined, collection);
    model.img = fullPath;

    await model.save();


    res.json(model);

}









//mostrar imagen
const showImg = async (req, res = response) => {

    const { id, collection } = req.params;

    let model;

    switch (collection) {
        case 'users':

            model = await User.findById(id);

            if (!model) {
                return res.status(400).json({
                    msg: 'this id doesnt exist'
                })
            }

            break;

        case 'products':

            model = await Product.findById(id);

            if (!model) {
                return res.status(400).json({
                    msg: 'this product doesnt exist'
                })
            }

            break;

        default:
            return res.status(500).json({ msg: 'esto no esta terminado' })
            break;
    }


    //si el producto o usuario tiene imagen , mostramos la imagen
    if (model.img) {
        
        const pathImg = path.join(__dirname, '../uploads', collection, model.img);

        if (fs.existsSync(pathImg)) {
            return res.sendFile(pathImg);
        }

    }

    //si no tiene imagen, mostramos la imagen not found
    const pathImagen = path.join(__dirname, '../assets/no-image.jpg');
    res.sendFile(pathImagen);

}








//actualizar imagenes en cloudinary para que no se repitan, o se borren las imagenes antiguas
const updateImgCloudinary = async (req, res = response) => {

    const { id, collection } = req.params;

    let model;

    switch (collection) {
        case 'users':

            model = await User.findById(id);

            if (!model) {
                return res.status(400).json({
                    msg: 'this id doesnt exist'
                })
            }

            break;

        case 'products':

            model = await Product.findById(id);

            if (!model) {
                return res.status(400).json({
                    msg: 'this product doesnt exist'
                })
            }

            break;

        default:
            return res.status(500).json({ msg: 'esto no esta terminado' })
            break;
    }


    //limpiar imagenes previas
    if (model.img) {
        //borrar img anterior del servidor cloudinary 
        const nameArr = model.img.split('/');
        const name = nameArr[nameArr.length - 1];
        const [ public_id ] = name.split('.');
        
        cloudinary.uploader.destroy(public_id);
    }


    //subir imagen a cloudinary
    const { tempFilePath } = req.files.archives
    const {secure_url} = await cloudinary.uploader.upload(tempFilePath);

    model.img = secure_url;

    //devolvemos los datos del producto 
    await model.save();


    res.json(model);

}




module.exports = {
    uploadFile,
    updateImg,
    showImg,
    updateImgCloudinary
}