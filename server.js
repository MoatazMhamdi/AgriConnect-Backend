import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import { notFoundError } from "./middlewares/error-handler.js";
import { errorHandler } from "./middlewares/error-handler.js";
import equipmentRoutes from "./routes/equipmentRoutes.js";



const app = express();
const PORT = 9090 || process.env.PORT;
const databaseName = 'AgriConnect';

//affichages de requetes dans la console
mongoose.set('debug', true);

//promise bch ystenales microsevices y5dmou bch yconttecti
mongoose.Promise = global.Promise;

mongoose.connect(`mongodb://localhost:27017/${databaseName}`)
    .then(() => {
        console.log(`connected to ${databaseName}`);
    })
    .catch((error) => {
        console.log(error);
    });

app.use(cors()); //security
app.use(morgan('dev')); //statut fel terminal 
app.use(express.json()); // bch yjm ya9ra json

app.use('/equipments', equipmentRoutes);//bch yjib les routes mt3 equipement

app.use(notFoundError); // bch yjib erreur 404
app.use(errorHandler); // bch yjib erreur 500

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
