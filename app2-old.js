const http = require('http');


//creamos el servidor (manera simple)
http.createServer((req, res) => {

    res.setHeader('Content-Disposition', 'attachment; filename=lista.csv');
    
    //Esto descarga un archivo .csv con los datos 
    res.writeHead(200, { 'Content-Type': 'application/csv' });


    res.write('id, nombre\n');
    res.write('1, Fernando\n');
    res.write('2, Maria\n');
    res.write('3, Juan\n');

    res.end();
})
.listen(8080);

console.log('Escuchando el puerto 8080');