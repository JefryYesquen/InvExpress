import { pool } from "../../Capa_de_Datos/databaseconnection.js";

export const obtenerCategorias = async (req, res) => {
  try {
    // Trae id y nombre de la tabla categorias
    const result = await pool.query(
      "SELECT id, nombre FROM categorias ORDER BY nombre ASC"
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error al obtener categorías:", error);
    res.status(500).json({ message: "Error al obtener categorías" });
  }
};
