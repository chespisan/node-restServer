
const express = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();

app.post('/login', (req, res)=>{
    
    let body = req.body;


    // verificar si el correo existe con filtros
    Usuario.findOne({ email: body.email }, (err, usuarioDB)=>{
       
        // 1. filtro: error DB (interno del server)
        if(err){
            return res.status(500).json({
                ok: false,
                err
            });
        }

        // 2. filtro: si el email no existe
        if( !usuarioDB ){
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'El (usuario) o contraseña incorrectos '
                }
            });
        }

        // 3. filtro: evaluamos la contraseña con el bcrypt y comparamos si no es la misma
       if( !bcrypt.compareSync( body.password, usuarioDB.password)){
        return res.status(500).json({
            ok: false,
            err: {
                message: 'El usuario o (contraseña) incorrectos '
            }
        });
       }

       // 4. filtro: generamos el token
       let token = jwt.sign({
           usuario:usuarioDB
       }, process.env.SPEED, { expiresIn: process.env.CADUCIDAD_TOKEN})



       // 5. filtro: devolvemos la respuesta ya comprobando los anteriories filtros y ya con el token 
        res.json({
            ok: true,
            usuario: usuarioDB,
            token
        })
    })
});

module.exports = app;