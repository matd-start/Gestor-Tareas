import { z } from "zod";

export const registerSchema = z.object({
  username: z
    .string({
      required_error: "Nombre de usuario es requerido",
    })
    .min(5, {
      message: "nombre de usuario debe tener al menos 5 caracteres",
    })
    .max(20, {
      message: "nombre de usuario debe tener menos de 20 caracteres",
    }),
  email: z
    .string({
      required_error: "Email es requerido",
    })
    .email({
      message: "Este email no es valido",
    }),
  password: z
    .string({
      required_error: "La contraseña es requerida",
    })
    .min(5, {
      message: "La contraseña debe tener al menos 5 caracteres",
    }),
});

export const loginSchema = z.object({
  email: z
    .string({
      required_error: "Email es requerido",
    })
    .email({
      message: "Este email no es valido",
    }),
  password: z
    .string({
      required_error: "La contraseña es requerida",
    })
    .min(5, {
      message: "La contraseña debe tener al menos 5 caracteres",
    }),
});
