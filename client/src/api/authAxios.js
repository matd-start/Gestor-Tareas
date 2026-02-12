
import axios from "./axios.js";


export const registerRequets = user => axios.post(`/register`, user); // Axios.post es una función que recibe dos argumentos, el primero es la URL y el segundo es el objeto que quiero enviar al servidor (en este caso, el usuario que se está registrando)
export const loginRequest = user => axios.post(`/login`, user); 

export const verifyTokenRequest = () => axios.get(`/verify`); // Verifica si el token es válido y devuelve el usuario correspondiente