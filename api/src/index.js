const app = require('./app');
const { connect } = require('./config/database')

async function main() {
   await app.listen( app.get('port') );
   // await connect();
   await console.log(`Server 🚀 :  http://localhost:${app.get('port')}/`)
   
}

main();