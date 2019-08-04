const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

module.exports = {

    // metodo para conectar a db
	connect: async function () {
        try {
            const db = await mongoose.connect(process.env.URI || 'mongodb://127.0.0.1:27017/placas', { 
                useCreateIndex: true,
                useNewUrlParser: true,
                useFindAndModify: false
            })
            console.log('conectado a db!')
            return db;  
        } catch(e) {
            console.log(e);
        }
        
    },

    // metodo para desconectar de db
	disconnect: async  function() {
        try {
            console.log('Desconectado de DB');
            return await mongoose.connection.close();  
        } catch (error) {
            console.log(error);
        }
    }
}