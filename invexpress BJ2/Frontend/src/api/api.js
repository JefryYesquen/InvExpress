// src/api/api.js
import axios from 'axios';

// Preferimos la URL definida en VITE_API_URL. Si no existe, asumimos el backend
// de desarrollo en http://localhost:3000/api para evitar caer en el mock.
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const API = axios.create({ baseURL });
const api = axios.create({
  baseURL: "http://localhost:4000", // backend Express
});

export default API;
