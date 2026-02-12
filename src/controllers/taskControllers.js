import Task from "../modelsSchemas/Task.js";

// obteber todas las tareas metodo get
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).populate("user");
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// crear una nueva tarea metodo post
export const createTasks = async (req, res) => {
  try {
    const { title, description, done, date } = req.body;// Extraemos los datos del cuerpo de la solicitud
    const newTask = new Task({// Creamos una nueva tarea con los datos recibidos
      title,
      description,
      done,
      date,
      user: req.user.id, // Asignamos el ID del usuario que creó la tarea
    });
    // Guardamos la tarea en la base de datos
    const savedTask = await newTask.save();
    // Enviamos la tarea guardada como respuesta
    res.status(201).json(savedTask);
  } catch (error) {
    // Si es un error de validación de Mongoose, respondemos con un 400
    if (error.name === "ValidationError") {
      return res.status(400).json(error);
    }
    // Para cualquier otro error, enviamos un 500
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// odtener una tarea con el metodo get
export const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate("user");
    if (!task) return res.status(404).json({ message: "task not found" });

    res.json(task);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// borrar una tarea con el metodo delete
export const deledeteTasks = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: "task not found" });

    return res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// actualizar una tarea con el metodo put
export const updateTasks = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!task) return res.status(404).json({ message: "tarea no encontrada" });

    res.json(task);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

