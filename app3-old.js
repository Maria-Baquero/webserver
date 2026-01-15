const express = require('express');

const app = express();


app.get('/', (req, res) => {
    res.send('hola mundo!');
})

app.get('/hola-mundo', function(req, res){
    res.send('Hola mundo en su ruta');
});

app.listen(8080);