import { useEffect } from "react"
import { useTasks } from "../context/TasksContext"
import { Link } from "react-router-dom"

function TasksPage() {
  const { getTasks, tasks, deleteTask} = useTasks()
  useEffect(() => {
    getTasks()
  }, [getTasks]);

  if (!tasks) return (<h1>Loading...</h1>)

 return (
  <>
    {tasks.length === 0 ? (
      <p className="text-center text-gray-600 mt-6">Aún no tienes tareas.</p>
    ) : (
      <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {tasks.map(task => (
          <div key={task._id} className="bg-white p-6 rounded-lg shadow-md transition hover:shadow-lg">
            <header className="mb-2">
              <h2 className="text-xl font-semibold text-indigo-700">{task.title}</h2>
              <p className="text-gray-700">{task.description}</p>
            </header>
            <footer className="flex items-center justify-between mt-4">
              <span className="text-sm text-gray-500">
                {new Date(task.date).toLocaleDateString('es-ES', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
              <div className="flex gap-2">
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  onClick={() => {
                    deleteTask(task._id);
                    getTasks();
                  }}
                >
                  Borrar
                </button>
                <Link
                  to={`/tasks/${task._id}`}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Editar
                </Link>
              </div>
            </footer>
          </div>
        ))}
      </div>
    )}
  </>
);

}

export default TasksPage
