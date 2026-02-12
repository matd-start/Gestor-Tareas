import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  profile,
  verifyToken
} from "../controllers/registerUserControllers.js";
import { authMiddleware } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validatorZmiddleware.js";
import { registerSchema, loginSchema } from "../modelsSchemas/authZschema.js";

const router = Router(); // Router es un metodo de express que nos permite crear rutas
// ruta para crear un usuario
router.post("/register", validateSchema(registerSchema), registerUser); // post me recibe el nombre de la ruta y la funcion que se ejecutara cuando se haga una peticion a esa ruta

// ruta para loguear un usuario
router.post("/login", validateSchema(loginSchema), loginUser);

// ruta logout (una vez que el usuario se ha logueado) debe de borrar el token del navegador al cerrar sesion
router.post("/logout", logoutUser);

router.get("/verify", verifyToken ) // ruta que verifica el token y devuelve un mensaje si es valido

// ruta que valida el token
router.get("/profile", authMiddleware, profile);

export default router;
