import User from "../modelsSchemas/User.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/secretKey.js"; // importamos el secreto del token

// funcion para registrar un usuario peticion POST, recibe un req y un res
export const registerUser = async (req, res) => {
  const { username, email, password} = req.body; // extraemos el username, email y password del cuerpo de la peticion
  try {
    // buscamos si el usuario ya existe en la base de datos
    const userFound = await User.findOne({ email }); 
    if (userFound) return res.status(400).json(["el usuario ya existe"]); // si el usuario ya existe respondemos con un status 400 y un json con el error

    const passwordHash = await bcrypt.hash(password, 10); // encriptamos la contraseña con bcrypt
    // creamos un nuevo usuario en la base de datos
    const newUser = new User({
      username,
      email,
      password: passwordHash,
    });

    const userSaved = await newUser.save(); // guardamos el usuario en la base de datos
    const token = await generateToken({ id: userSaved._id });
    res.cookie("token", token);
    res.json({
      // respondemos con un json que se usara en el frontend
      id: userSaved._id, // solo retornamos el id, username, email, createdAt y updatedAt
      username: userSaved.username,
      email: userSaved.email,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
    }); // retornamos el usuario creado pero solo su id, username y email para usarlos en el frontend
  } catch (error) {
    res.status(500).json({ error: error.message }); // si hay un error en la peticion respondemos con un status 500 y un json con el error
  }
};

// funcion para loguear un usuario peticion POST

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // del modelo User, user.findOne es una promesa que se resuelve cuando el usuario se encuentra en la base de datos
    const userFound = await User.findOne({ email });
    if (!userFound) return res.status(401).json({ message: "Usuario no encontrado" });

    // .compare es una propiedad de bcrypt que compara la contraseña con la contraseña encriptada de la base de datos
    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) return res.status(400).json({ message: "Contraseña incorrecta" });

    const token = await generateToken({ id: userFound._id });
    
    res.cookie("token", token);
    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// funcion para cerrar la sesion peticion POST

export const logoutUser = (req, res) => {
  res.cookie("token", "", { expires: new Date(0) }); //
  return res.sendStatus(200);
};

// creamos una fucion para verificar si el usuario esta autenticado
export const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id);

  if (!userFound) return res.status(404).json({ message: "Usuario no encontrado" });
  return res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt,
  });
};

export const verifyToken = async (req, res) => {
  const token = req.cookies.token; // obtenemos el token de las cookies
  if (!token) return res.status(401).json({ message: "No hay token" }); // si no hay token respondemos con un status 401
  jwt.verify(token, JWT_SECRET, async(err, user) => {
    if (err) return res.status(401).json({ message: "Token no valido" }); // si el token no es valido respondemos con un status 401
    const userFound = await User.findById(user.id); // buscamos el usuario en la base de datos
    if (!userFound) return res.status(404).json({ message: "Usuario no encontrado" }); // si el usuario no existe respondemos con un status 404

    return res.json({ // si el token es valido retornamos el usuario
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });   
  }); 
}
