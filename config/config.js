

/** Puerto */
process.env.PORT = process.env.PORT || 3000

/** Entorno */
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

/** Base de datos */

let urlDB;

if(process.env.NODE_ENV === 'dev'){
    urlDB = 'mongodb://localhost:27017/usuarios';
} else {
    urlDB = process.env.MONGO_URL;
}

/** Vencimiento del token */
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;


/** SEED de autenticacion */
process.env.SPEED = process.env.SPEED || 'este-es-el-seed-desarrollo';