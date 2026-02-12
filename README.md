Este proyecto es un gestor de tareas web, diseñado para que los usuarios puedan registrarse, iniciar sesión y gestionar sus tareas personales. Utiliza una arquitectura full stack:

Backend (Node.js + Express + MongoDB):

Permite el registro y autenticación de usuarios mediante JWT.
Ofrece endpoints para crear, leer, actualizar y eliminar tareas.
Protege rutas mediante tokens y valida datos con middlewares.
Almacena usuarios y tareas en MongoDB.
Frontend (React + Vite):

Proporciona una interfaz moderna y responsiva.
Permite a los usuarios ver, crear, editar y eliminar tareas.
Incluye páginas de registro, login, perfil y gestión de tareas.
Usa rutas protegidas para asegurar que solo usuarios autenticados accedan a ciertas páginas.
Seguridad:

Variables sensibles (como claves y cadenas de conexión) se gestionan con archivos .env.
El proyecto está listo para subir a un repositorio sin exponer datos críticos.
En resumen, es una aplicación completa para la gestión de tareas, con enfoque en seguridad, buenas prácticas y experiencia de usuario.
