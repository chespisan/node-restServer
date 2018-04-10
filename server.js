/** Import Modules */

require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

/** Setting */
//app.set('port', process.env.PORT || 3000);

/** require routes */
const routes = require('./routes/index');

/** Connect Mongo */
mongoose.connect('mongodb://localhost:27017/usuarios', (err , res)=>{
    if(err) throw err;
    console.log('Base de datos Online');
});

/** Middlewares */
app.use (function (req, res, next) {
    res.header ("Access-Control-Allow-Origin", "*");
    res.header ("Access-Control-Allow-Headers", "Origen, X-Solicitado-Con, Content-Type, Accept");
    res.header ("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS"); 
    next();
  });

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

/** Routes */
app.use(routes);

/** Server on */
app.listen(process.env.PORT,()=>{
    console.log(`server on port ${process.env.PORT}`);
})