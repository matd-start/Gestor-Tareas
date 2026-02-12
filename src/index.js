// en index arrancamos la aplicacion
import app from "./app.js";
import express from 'express';
import morgan from "morgan";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/registerUser.routes.js";
import taskRoutes from "./routes/task.routes.js";
import { connectDB } from "./config/db.js";
import cors from "cors";


connectDB();//inicializamos a la base de datos

app.use(cors({// para permitir que el servidor pueda recibir peticiones de un cliente que no esté en el mismo servidor
    origin: "http://localhost:5173", // la url del cliente
    credentials: true // para que el servidor pueda recibir las cookies
}));
app.use(morgan("dev")); // para que morgan pueda mostrar los mensajes en consola
app.use(express.json()); // para que express pueda entender json   
app.use(cookieParser());// para que express pueda entender las cookies

app.use("/api", userRoutes);
app.use("/api", taskRoutes);


app.listen(3000);
console.log("server on port", 3000);
