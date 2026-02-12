import { useForm } from "react-hook-form";
import { useAuth } from "../context/useAuth";
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";

function RegisterPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signup, isAuthenticated, errors: registerErros } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/tasks");
  }, [isAuthenticated, navigate]);

  const onSubmit = handleSubmit(async (values) => {
    await signup(values);
  });

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">

        {Array.isArray(registerErros) && registerErros.map((error, i) => (
          <div key={i} className="text-white text-sm p-1 rounded-md bg-red-500 mb-2 ">{error}</div>
        ))}
        
        <h1 className="text-2xl font-bold text-indigo-600 text-center tracking-wide italic">Crea una cuenta</h1>

        <form className="mt-6 space-y-4" onSubmit={onSubmit}
        >
          {errors.username && <span className="text-red-500 text-xs">Este campo es obligatorio</span>}
          <input type="text" placeholder="Nombre de usuario"
            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-800 placeholder-gray-600 focus:border-indigo-500 focus:ring-2 italic"
            {...register("username", { required: true })} />

          {errors.email && <span className="text-red-500 text-xs">Este campo es obligatorio</span>}
          <input type="email" placeholder="Correo electrónico"
            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-800 placeholder-gray-600 focus:border-indigo-500 focus:ring-2 italic"
            {...register("email", { required: true })} />

          {errors.password && <span className="text-red-500 text-xs">Este campo es obligatorio</span>}
          <input type="password" placeholder="Contraseña"
            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-800 placeholder-gray-600 focus:border-indigo-500 focus:ring-2 italic"
            {...register("password", { required: true })} />

          <button type="submit"
            className="w-full px-4 py-2 text-white font-semibold bg-indigo-500 rounded-md hover:bg-indigo-700 transition duration-300 focus:ring-2 focus:ring-indigo-400 cursor-pointer"
          >Registrarse</button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">¿Ya tienes una cuenta? <Link to="/login" className="text-indigo-600 hover:text-indigo-700 font-semibold">Inicia sesión</Link></p>

      </div>
    </div>
  );
}

export default RegisterPage;
