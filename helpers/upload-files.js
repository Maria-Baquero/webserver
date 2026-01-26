const path = require('path');
const { v4: uuidv4 } = require('uuid');





//cargar archivos
const uploadFiles = (files, allowedExtensions = ['png', 'jpg', 'jpeg', 'gif'], folder = '') => {


    return new Promise((resolve, reject) => {

        const { archives  } = files;

        //separamos el nombre del archivo por .
        const cutName = archives.name.split('.');

        //comprobamos la extension del archivo subido
        const extension = cutName[cutName.length - 1];


        //comprobamos si la extension del archivo esta permitida
        if (!allowedExtensions.includes(extension)) {
            return reject(`The extension: ${extension} is not allowed, ${allowedExtensions}`);
        }


        //cambiamos el nombre a los archivos
        const nameTemp = uuidv4() + '.' + extension;

        //definimos la carpeta donde se guardaran los archivos
        const uploadPath = path.join(__dirname, '../uploads/', folder, nameTemp);

        //movemos el archivo y mostramos los datos que queremos
        archives.mv(uploadPath, (err) => {

            if (err) {
                reject(err);
            }

            resolve(nameTemp);
        });


    });

}



module.exports = {
    uploadFiles
}