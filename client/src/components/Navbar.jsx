import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth();

return (
  <nav className="shadow-sm bg-white dark:bg-gray-900 border-b dark:border-gray-700">
    <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
      {/* Logo */}
      <Link to={isAuthenticated ? "#" : "/"} className="flex items-center gap-2">
        <svg className="w-8 h-8 text-purple-700 dark:text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 5V4a1 1 0 0 0-1-1H8.914a1 1 0 0 0-.707.293L4.293 7.207A1 1 0 0 0 4 7.914V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5M9 3v4a1 1 0 0 1-1 1H4m11.383.772 2.745 2.746m1.215-3.906a2.089 2.089 0 0 1 0 2.953l-6.65 6.646L9 17.95l.739-3.692 6.646-6.646a2.087 2.087 0 0 1 2.958 0Z" />
        </svg>
        <span className="text-2xl font-bold text-gray-800 dark:text-white">Tus tareas</span>
      </Link>

      {/* Menú de navegación */}
      <div className="flex items-center gap-4 flex-wrap">
        {isAuthenticated ? (
          <>
            <span className="hidden sm:block text-lg font-semibold text-cyan-600 dark:text-white">
              Bienvenido, {user.username}
            </span>

            <Link
              to="/add-tasks"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-cyan-600 to-cyan-300 p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:text-white dark:focus:ring-cyan-800 group-hover:from-cyan-600 group-hover:to-cyan-300"
            >
              <span className="relative rounded-md bg-white px-5 py-2.5 transition-all ease-in duration-75 group-hover:bg-transparent group-hover:dark:bg-transparent dark:bg-gray-900">
                Añadir tarea
              </span>
            </Link>

            <Link
              to="/"
              onClick={() => logout()}
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-pink-500 to-orange-400 p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-pink-200 dark:text-white dark:focus:ring-pink-800"
            >
              <span className="relative rounded-md bg-white px-5 py-2.5 transition-all ease-in duration-75 group-hover:bg-transparent group-hover:dark:bg-transparent dark:bg-gray-900">
                Cerrar sesión
              </span>
            </Link>
          </>
        ) : (
          <>
            <h1 className="font-bold">&quot;La productividad no es cuestión de hacer más, sino de hacer lo que importa.&quot; — Autor anónimo</h1>
          </>
        )}
      </div>
    </div>
  </nav>
);
}

export default Navbar;