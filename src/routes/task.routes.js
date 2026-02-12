import { Router } from "express";
import { authMiddleware } from "../middlewares/validateToken.js";
import {
  createTasks,
  deledeteTasks,
  getTask,
  getTasks,
  updateTasks,
} from "../controllers/taskControllers.js";
import { validateSchema } from "../middlewares/validatorZmiddleware.js";
import { createTaskSchema } from "../modelsSchemas/taskZschemas.js"; 

const router = Router();

// odtener tareas
router.get("/tasks",authMiddleware,  getTasks);

// obteber tarea por id
router.get("/tasks/:id", authMiddleware, getTask);

// crear una nueva tarea
router.post("/tasks", authMiddleware, validateSchema(createTaskSchema), createTasks);

// borrar una tarea
router.delete("/tasks/:id", authMiddleware, deledeteTasks);

// actualizar una tarea
router.put("/tasks/:id", authMiddleware, updateTasks);

export default router;
