import { createContext, useContext, useState, useCallback } from "react";
import { createTaskRequest, getTasksRequest, deleteTaskRequest, getTaskRequest, updateTaskRequest } from "../api/tasks";
import PropTypes from "prop-types"

const TasksContext = createContext();

export const useTasks = () => {

  const context = useContext(TasksContext);
  if (!context) {
    throw new Error("useTasksContext must be used within a TasksProvider");
  }
  return context;
};

export function TasksProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  const getTasks = useCallback(async () => {
    try {
      const res = await getTasksRequest();
      setTasks(res.data);
    } catch (error) {
      console.error("Error al obtener tareas:", error);
    }
  }, []);


  const createTask = async (task) => {
    try {
      const res = await createTaskRequest(task);
      setTasks(prevTasks => [...prevTasks, res.data]);
      console.log(res.data);
    } catch (error) {
      console.error('Error al crear la tarea:', error);
    }
  }

  const deleteTask = async (id) => {
    try {
      const res = await deleteTaskRequest(id);
      if (res.status === 204) {
        setTasks(tasks.filter(task => task._id !== id));
      }
      console.log(res.data);
    } catch (error) {
      console.error('Error al eliminar la tarea:', error);
    }
  }

  const getTask = async (id) => {
  try {
    const res = await getTaskRequest(id);
    return res.data;
  } catch (error) {
    console.error("Error al obtener la tarea:", error);
  }
};

  
   const updateTask = async (id, task) => {
    try {
      const res = await updateTaskRequest(id, task);
      console.log(res.data);
    } catch (error) {
      console.error('Error al actualizar la tarea:', error);
    }
  }
 

  return (
    <TasksContext.Provider value={{
      tasks,
      setTasks,
      createTask,
      getTasks,
      deleteTask,
      getTask,
      updateTask
    }}>
      {children}
    </TasksContext.Provider>
  );
}

TasksProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TasksContext;