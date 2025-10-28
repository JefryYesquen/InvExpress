import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer'; // 👈 agrega esto
import { pool } from './Capa_de_Datos/databaseconnection.js';
import { routerUsuarios } from './Backend/Controller/usuariosController.js';
import { routerProductos } from './Backend/Routes/productos.routes.js';
import { routerCategorias } from './Backend/Routes/categorias.routes.js';
import { routerUnidades } from './Backend/Routes/unidades.routes.js';
import authRoutes from "./Backend/Routes/auth.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Configurar CORS (solo una vez)
app.use(cors({
  origin: "http://localhost:5173", // permite conexión desde React
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// ✅ Middlewares globales
app.use(express.json());

// ✅ Ruta de prueba
app.get('/', (req, res) => {
  res.send('Servidor InvExpress funcionando correctamente ✅');
});

// ✅ Rutas del sistema
app.use('/api/usuarios', routerUsuarios);
app.use('/api/productos', routerProductos);
app.use('/api/categorias', routerCategorias);
app.use('/api/unidades', routerUnidades);
app.use("/auth", authRoutes); // 👈 tu módulo de recuperación de contraseña

// 🧪 Prueba de conexión SMTP (verifica Gmail)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Error al conectar con Gmail SMTP:", error);
  } else {
    console.log("✅ Conexión SMTP correcta. Listo para enviar correos.");
  }
});

// ✅ Iniciar servidor
app.listen(PORT, async () => {
  try {
    await pool.query('SELECT NOW()');
    console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
    console.log('📦 Conexión a PostgreSQL exitosa');
  } catch (error) {
    console.error('❌ Error al conectar con la base de datos:', error.message);
  }
});
