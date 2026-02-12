import { useForm } from "react-hook-form";
import { useAuth } from "../context/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";


function LoginPage() {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signin, errors: signinErros, isAuthenticated } = useAuth();
  const navigate = useNavigate();


  const onSubmit = handleSubmit(async (data) => {
    signin(data);
  });

  useEffect(() => {
    if (isAuthenticated) navigate("/tasks");
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">

        {signinErros.map((error, i) => (
          <div key={i} className="text-white text-sm p-1 rounded-md bg-red-400 mb-2 ">{error}</div>
        ))}

        <h1 className="text-2xl font-bold text-indigo-600 text-center tracking-wide italic">Bienvenido</h1>

        <form className="mt-6 space-y-4" onSubmit={onSubmit}
        >
          {errors.email && <span className="text-red-400 text-xs">Este campo es obligatorio</span>}
          <input type="email" placeholder="Correo electrónico"
            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-800 placeholder-gray-600 focus:border-indigo-500 focus:ring-2 italic"
            {...register("email", { required: true })} />

          {errors.password && <span className="text-red-500 text-xs">Este campo es obligatorio</span>}
          <input type="password" placeholder="Contraseña"
            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-800 placeholder-gray-600 focus:border-indigo-500 focus:ring-2 italic"
            {...register("password", { required: true })} />

          <button type="submit"
            className="w-full px-4 py-2 text-white font-semibold bg-indigo-500 rounded-md hover:bg-indigo-700 transition duration-300 focus:ring-2 focus:ring-indigo-400 cursor-pointer"
          >Iniciar sección</button>
          
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">¿No tienes una cuenta? <Link to="/register" className="text-indigo-600 hover:text-indigo-700 font-semibold">Registrate</Link></p>

      </div>
    </div>
  );
}

export default LoginPage;