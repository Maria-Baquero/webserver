const http = require('http');


//creamos el servidor (manera simple)
http.createServer((req, res) => {


    //devolver un archivo de texto:
    //res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.writeHead(200, { 'Content-Type': 'application/JSON' });


    const perosna = {
        nombre: 'Tony',
        edad: 32,
        url: req.url
    };


    res.write(JSON.stringify(perosna));
    res.end();
})
.listen(8080);

console.log('Escuchando el puerto 8080');