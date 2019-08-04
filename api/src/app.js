// Modulos
const express = require('express');
const cors = require('cors');
const app = express();

// Settings
app.set('port', process.env.PORT || 6000);

// Middelwares
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// Routs
app.use( '/usuarios', require('./routes/usuario.routes') );
app.use( '/placas', require('./routes/placa.routes') );


// Static Files

module.exports = app;