# Variables de entorno

Para ejecutar el proyecto, crea un archivo `.env` en la raíz con el siguiente contenido:

```
MONGO_URI=mongodb://localhost/gestor-tareas
JWT_SECRET=your-secret-key
```

No subas el archivo `.env` al repositorio.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
