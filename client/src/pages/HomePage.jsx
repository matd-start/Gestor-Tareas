import { Link } from "react-router-dom";
import icon from "../assets/management_icon.png"; // Importa la imagen de gestión de tareas

function HomePage() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple via-blue-100 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 py-16 flex flex-col-reverse md:flex-row items-center gap-10">
        
        {/* Texto de bienvenida */}
        <div className="md:w-1/2">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
            Organiza tus tareas <br />de forma rápida y sencilla
          </h1>
          
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
            Regístrate gratis para comenzar a crear, editar y eliminar tus tareas como pequeñas notas privadas.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/register"
              className="inline-block px-6 py-3 text-white bg-gradient-to-r from-purple-500 to-purple-500 rounded-lg font-medium shadow-md hover:opacity-90 transition"
            >
              Regístrate
            </Link>
            <Link
              to="/login"
              className="inline-block px-6 py-3 bg-white text-purple-500 border border-purple-500 rounded-lg font-medium shadow-md hover:bg-purple-100 dark:bg-gray-900 dark:text-purple-400 dark:border-purple-400 dark:hover:bg-gray-800 transition"
            >
              Inicia sesión
            </Link>
          </div>
        </div>

        {/* Imagen decorativa o ilustración */}
        <div className="md:w-1/2">
          <img
            src={icon} className="w-40 h-35 transition duration-500 hover:brightness-125 md:w-80 md:h-80 mx-auto " alt="Gestión de tareas"
           
          />
        {/*  src="https://cdn-icons-png.flaticon.com/512/4415/4415443.png" */}
        </div>
      </div>
    </section>
  );
}

export default HomePage;
