import { pool } from "../../Capa_de_Datos/databaseconnection.js";

export const obtenerUnidades = async (req, res) => {
  try {
    const result = await pool.query("SELECT id, nombre, abreviatura FROM unidades_medida ORDER BY nombre");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error al obtener unidades:", error);
    res.status(500).json({ message: "Error al obtener unidades" });
  }
};
