require('dotenv').config();
const express = require('express');
const hbs = require('hbs');

const app = express();
const port = process.env.PORT;

//Handlebars
app.set('view engine', 'hbs');
hbs.registerPartials( __dirname + '/views/partials', function (err) {});


//RUTAS

//Contenido estatico
//uso de middleware (uso de la carpeta public) 
app.use(express.static('public'));


//pagina  principal
app.get('/', (req, res) => {
    //mandamos la vista home renderizada a la ruta home
        //con render podemos pasar un segundo argumento que son las opciones, donde pueden ir datos
    res.render('home', {
        nombre: 'Maria Baquero',
        titulo: 'Course Node'
    });
})



app.get('/generic', function(req, res){
    res.render('generic', {
        nombre: 'Maria Baquero',
        titulo: 'Course Node'
    });
});


app.get('/elements', function(req, res){
    res.render('elements', {
        nombre: 'Maria Baquero',
        titulo: 'Course Node'
    });
});


app.listen(port, () =>{
    console.log(`App listening at http://localhost:${port}`)
})


app.listen(8080);