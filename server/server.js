const express = require('express');
const bodyParser = require('body-parser');
const app = express();

/** Setting */
app.set('port', process.env.PORT || 3000);


/** Middlewares */
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Rutas Prueba
app.get('/usuario', (req, res) => {
    res.json('get Usuario');
})

app.post('/usuario', (req, res)=> {
    
    let body = req.body;

    // si no envian nombre
    if(body.nombre === undefined){
        res.status(400).json({
            ok: "false",
            mensaje: 'EL nombre es necesario'
        })
    }else{
        res.json({
            persona: body
        });
    }
    

    
})

app.put('/usuario', (req, res)=> {
    res.json('put Usuario');
})

app.delete('/usuario', (req, res)=> {
    res.json('delete Usuario');
})



/** Server on */
app.listen(app.get('port'),()=>{
    console.log(`server on port ${app.get('port')}`);
})