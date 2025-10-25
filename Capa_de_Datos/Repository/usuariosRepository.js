import { pool } from "../databaseconnection.js";

// Obtener todos los usuarios
export async function obtenerTodos() {
  const query = `
    SELECT u.id, u.nombre, u.email, u.activo, u.creado_en,
           r.nombre AS rol
    FROM usuarios u
    LEFT JOIN usuario_rol ur ON u.id = ur.usuario_id
    LEFT JOIN roles r ON ur.rol_id = r.id
    ORDER BY u.id;
  `;
  const result = await pool.query(query);
  return result.rows;
}

// Obtener usuario por ID
export async function obtenerPorId(id) {
  const query = `
    SELECT u.id, u.nombre, u.email, u.activo, u.creado_en,
           r.nombre AS rol
    FROM usuarios u
    LEFT JOIN usuario_rol ur ON u.id = ur.usuario_id
    LEFT JOIN roles r ON ur.rol_id = r.id
    WHERE u.id = $1;
  `;
  const result = await pool.query(query, [id]);
  return result.rows[0];
}

// Crear usuario
export async function crearUsuario({ nombre, email, password_hash, rol_id }) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const insertUser = `
      INSERT INTO usuarios (nombre, email, password_hash, activo)
      VALUES ($1, $2, $3, TRUE)
      RETURNING id, nombre, email, activo, creado_en;
    `;
    const userResult = await client.query(insertUser, [nombre, email, password_hash]);
    const usuario = userResult.rows[0];

    if (rol_id) {
      await client.query(
        "INSERT INTO usuario_rol (usuario_id, rol_id) VALUES ($1, $2)",
        [usuario.id, rol_id]
      );
    }

    await client.query("COMMIT");
    return usuario;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

// Actualizar usuario
export async function actualizarUsuario(id, { nombre, email, activo, rol_id }) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const updateQuery = `
      UPDATE usuarios
      SET nombre = $1, email = $2, activo = $3
      WHERE id = $4
      RETURNING id, nombre, email, activo, creado_en;
    `;
    const userResult = await client.query(updateQuery, [nombre, email, activo, id]);
    const usuario = userResult.rows[0];

    if (rol_id) {
      await client.query("DELETE FROM usuario_rol WHERE usuario_id = $1", [id]);
      await client.query(
        "INSERT INTO usuario_rol (usuario_id, rol_id) VALUES ($1, $2)",
        [id, rol_id]
      );
    }

    await client.query("COMMIT");
    return usuario;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

// Eliminar usuario
export async function eliminarUsuario(id) {
  const result = await pool.query(`DELETE FROM usuarios WHERE id = $1 RETURNING *;`, [id]);
  return result.rows[0];
}
