const path = require('path');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();

//connecting to databases

mongoose.connect('mongodb://localhost/crud-example',{
    useUnifiedTopology: true,
    useNewUrlParser: true
})
.then(db => console.log('db conectado'))
.catch(err => console.log(err));

//import routes
const routes = require('./routes/index');

//settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));

//routes
app.use('/', routes);

//starting the server
app.listen(app.get('port'), ()=>{
    console.log(`Servidor escuchando en el puerto: ${app.get('port')}` );
});