const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

/** Setting */
app.set('port', process.env.PORT || 3000);

/** require routes */
const routes = require('./routes/usuario');

/** Connect Mongo */
mongoose.connect('mongodb://sergio:123456@ds239359.mlab.com:39359/usuarios', (err , res)=>{
    if(err) throw err;
    console.log('Base de datos Online');
});

/** Middlewares */
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

/** Routes */
app.use(routes);
/** Server on */
app.listen(app.get('port'),()=>{
    console.log(`server on port ${app.get('port')}`);
})