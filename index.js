import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { pool } from "./Capa_de_Datos/databaseconnection.js";
import { routerProductos } from "./Backend/Controller/productosController.js";
import { routerUsuarios } from "./Backend/Controller/usuariosController.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("Servidor InvExpress funcionando correctamente ✅");
});

app.use("/api/productos", routerProductos);
app.use("/api/usuarios", routerUsuarios);

// Puerto desde .env
const PORT = process.env.PORT || 3000;

// Iniciar servidor
app.listen(PORT, async () => {
  try {
    // Probar conexión a BD al iniciar
    await pool.query("SELECT NOW()");
    console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
    console.log("📦 Conexión a PostgreSQL exitosa");
  } catch (error) {
    console.error("❌ Error al conectar con la base de datos:", error.message);
  }
});
