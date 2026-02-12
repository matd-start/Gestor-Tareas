import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/secretKey.js";
// un middleware recibe 3 parametros req, res y next y se ejecuta antes de la funcion que se le pasa como parametro
// next es una funcion que se ejecuta cuando el middleware ha terminado de ejecutarse
export const authMiddleware = (req, res, next) => {
  const { token } = req.cookies; // extraemos el token de las cookies de la peticion que se envia desde el frontend
  if (!token)
    return res.status(401).json({ message: "no token, authorization denied" });
// decoded o user es el dato que se obtiene al decodificar el token
  jwt.verify(token, JWT_SECRET, (error, user) => { // verificamos el token con la clave secreta con el metodo verify
    if (error) return res.status(401).json({ message: "token invalid" });
    
    req.user = user;// req.user es el usuario que se autenticado y esta en las rutas req.user._id
    next();
  });
};
