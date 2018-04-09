
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

// crear roles validos
let rolesValidos = {
    values: ['ADMIN_ROLE','USER_ROLE'],
    message: '{VALUE} no es un rol válido'
};

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        require: [true, 'El nombre es necesario'],
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'EL correo es obligatorio']
        
    },
    password: {
        type: String,
        require: true
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: String,
        default: false
    }
});

// utilizamos el plugin para validar
usuarioSchema.plugin(uniqueValidator, {message: '{PATH} debe de ser único'})

module.exports = mongoose.model('Usuario',usuarioSchema);
