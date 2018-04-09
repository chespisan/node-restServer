
const express = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const app = express();


// Rutas Prueba

// aqui podemos crear una ruta con la configuracion para que me regrese todos lso usuarios cons los filtros que le demos
app.get('/usuario', (req, res) => {
    
    // nos devolvera todos los usuarios, podemos filtrar un campo como condicion
    // ejemplo:  Usuario.find({}, 'nombre email') -> esto nos devolvera solo el campo nombre y email de cada registro
    Usuario.find({})
        .limit(5) //-> esto nos sirve para indicar cuantos registros queremos que nos devuelva
        .exec((err, usuarios)=>{
            if(err){
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            // metodo de conteo: podemos pedir q nos devuelva un conteo de todosa los registro, con sus filtros  etc
            Usuario.count({}, (err, conteo)=>{
                res.json({
                    ok: true,
                    usuarios
                });
            })
            
        })
});

// podria ser para crear nuestro usuariio
app.post('/usuario', (req, res)=> {
    
    let body = req.body;
    // creamos la instancia del modelo de usuario, para crear el usuario 
   let usuario = new Usuario({
       nombre: body.nombre,
       email: body.email,
       password: bcrypt.hashSync(body.password,10), 
       role: body.role
   });

   // metodo de mongoose
   usuario.save( (err, usuarioDB)=>{
       if(err){
           return res.status(400).json({
               ok: false,
               err
           });
       }
       res.json({
           ok: true,
           usuario: usuarioDB
       });
   });
});


// actualizamos datos de nuestro suuario(podriamos usuarlo para actualizar puntos:BP)
app.put('/usuario/:id', function(req, res) {

    let id = req.params.id;
    // metodo pick del underscode para validar los campots que podamso actualizar, recibe como aprakmetro el objeto completo y un arreglo de los campos q se puedan validaer
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    // metodo de mongoose para actualizar, recive el id, el body y un objeto con configuraciones y un callback
    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true}, function(err, usuarioDB){
        if(err){
            return res.status(400).json({
                ok:false,
                err
            });
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        })
    })
    
})


// eliminando registro
app.delete('/usuario/:id', (req, res)=> {
   
    //obtener el id
    let id = req.params.id

    /*
    // esto es para eliminar de la base dedatos el usuario completo
    Usuario.findByIdAndRemove(id, (err, usuarioBorrado)=>{

        if(err){
            return res.status(400).json({
                ok: false,
                err
            });
        };

        // si el usuario no existe
        if(!usuarioBorrado){
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            })
        }    
        res.json({
            ok: true,
            usuario: usuarioBorrado
        });
    });
    */

    // cambiaremos el estado del usuario a false, lo actualizaremos
    let cambiarRstado = {
        estado: false
    }
    Usuario.findByIdAndUpdate(id, cambiarRstado, {new: true}, (err, usuarioBorrado)=>{
        if(err){
            return res.status(400).json({
                ok: false,
                err
            });
        };

        res.json({
            ok: true,
            usuario: usuarioBorrado
        })
    })

})

module.exports = app;