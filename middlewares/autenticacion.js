
const jwt = require('jsonwebtoken');


// funcion para verificar  un token
let verificaToken = (req, res, next)=>{
    
    //recibimos el token
    let token = req.get('token');

    // verificar el token
    jwt.verify( token, process.env.SPEED, (err, decoded)=>{
        
        if(err){
            return res.status(401).json({
                ok: false,
                err
            });
        }

        req.usuario = decoded.usuario;
        
        next();

    });

    

};

module.exports = {
    verificaToken
}