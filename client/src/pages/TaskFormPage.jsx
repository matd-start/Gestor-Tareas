import { useForm } from "react-hook-form";
import { useTasks } from "../context/TasksContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom"


function TaskFormPage() {
  const { register, handleSubmit, setValue } = useForm();
  const { createTask, getTask, updateTask } = useTasks();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const loadTask = async () => {
      if (params.id) {
        const task = await getTask(params.id);
        console.log(task);
        setValue("title", task.title);
        setValue("description", task.description);

      }
    };
    loadTask();
  }, [getTask, params.id, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      updateTask(params.id, data)
      console.log("Editar tarea:", data);
    } else {
      await createTask(data);
    }
    navigate("/tasks");
  });



  return (
    <div className="w-full sm:w-1/2 mb-6 rounded-lg bg-white p-6 shadow-md mx-auto mt-10">

      <div className="mt-6 flex items-center justify-between text-sm font-semibold text-gray-900">
        <h1 className="text-2xl font-bold text-gray-800 text-centertracking-wide italic">Crear una Tarea</h1>
        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" d="M15 4h3a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3m0 3h6m-3 5h3m-6 0h.01M12 16h3m-6 0h.01M10 3v4h4V3h-4Z" />
        </svg>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <input type="text" placeholder="Tiltle"
          {...register("title")}
          className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-800 placeholder-gray-600 italic"
          autoFocus
        />
        <textarea placeholder="Description"
          {...register("description")}
          className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-800 placeholder-gray-600 italic"
          rows="3"
        />
        <div className="flex justify-between mt-4">
          <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-emerald-600 to-emerald-950 group-hover:from-emerald-600 group-hover:to-emerald-950 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
              Crear
            </span>
          </button>
        </div>
        <Link
          to={`/tasks`}
          className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-600 to-cyan-300 group-hover:from-cyan-600 group-hover:to-cyan-300 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800"
        >
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
            Volver
          </span>
        </Link>

      </form>


    </div>

  )
}

export default TaskFormPage