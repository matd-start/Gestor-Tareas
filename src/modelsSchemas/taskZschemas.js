import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string({
    required_error: "Title is required",
  }).min(1, "Title no debe esta vacio"), // Evita que sea una cadena vacía

  description: z.string({
    required_error: "Description is required",
  }).min(1, "descripcion no deberia estar vacio"), // Evita que sea una cadena vacía

  date: z.string().datetime().optional(),
});