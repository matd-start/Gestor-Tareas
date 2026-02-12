import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// creamos una funcion asincrona para conectar a la base de datos
export const connectDB = async () => {
  // try catch para manejar los errores
  try {
    await mongoose.connect(process.env.MONGO_URI); //conectamos a la base de datos
    console.log("conectado a la base datos", connectDB.name);
  } catch (error) {
    console.log(error);
  }
};
