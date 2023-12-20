
import * as Routes from '../../routes';
import * as bodyParser from 'body-parser';
import sequelize from "../connection/connection";
import express from 'express';
import errorHandler from '../middleware/middleware';
import cors from 'cors';



const app: express.Application = express();

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Routes
Routes.init(app);

// Habilita CORS para todas las rutas
app.use(cors());

app.use(errorHandler);
// env.port.toString() / process.env.PORT 
// sets port 3000 to default or unless otherwise specified in the environment
app.set('port', process.env.PORT || 3000);
// sets secret to 'superSecret', otherwise specified in the environment
//app.set('secret', process.env.SECRET || 'superSecret');


sequelize.sync().then(() => {
  console.log('CONNECTION IN DATABASE POSSTGRESQL');
}).catch((error) => {
  console.error('ERROR CONECTION DATABASE:', error);
});
const server = app.listen(app.get('port'), () => {
  console.log(`SERVER IS LISTENING ON ${app.get('port')}`);
});
server.on('error', (err: Error) => {
  console.error('Error occurred while starting the server:', err);
});
