import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/secretKey.js";

export function generateToken(payload) {
    
  return new Promise((resolve, reject) => {// new promise es un metodo que recibe una funcion con dos parametros, resolve y reject
    // jwt.sign es un metodo que recibe 3 parametros, el payload, la clave secreta y un objeto con la fecha de expiracion
    jwt.sign(
      payload,// payload es un objeto que contiene la informacion que queremos encriptar que en este caso es el id del usuario
      JWT_SECRET,// TOKEN_SECRET es la clave secreta que se encuentra en el archivo secretKey.js
      {
        expiresIn: "1d",
      },
      (error, token) => {
        if (error) reject(error);
        resolve(token);
      }
    );
  });
}
