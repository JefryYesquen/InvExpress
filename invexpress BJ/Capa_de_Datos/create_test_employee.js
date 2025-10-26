import bcrypt from 'bcryptjs';
import { pool } from './databaseconnection.js';

async function run() {
  try {
    // 1) asegurar rol 'empleado'
    const rolName = 'empleado';
    let rolId;
    const rolRes = await pool.query('SELECT id FROM roles WHERE nombre ILIKE $1 LIMIT 1', [rolName]);
    if (rolRes.rows.length === 0) {
      const insertRol = await pool.query('INSERT INTO roles (nombre, descripcion) VALUES ($1,$2) RETURNING id', [rolName, 'Rol de empleado']);
      rolId = insertRol.rows[0].id;
      console.log('Rol creado:', rolId);
    } else {
      rolId = rolRes.rows[0].id;
      console.log('Rol ya existe:', rolId);
    }

    // 2) crear usuario de prueba
    const email = 'empleado_test@local';
    const nombre = 'Empleado Test';
    const plain = 'empleado123';

    // comprobar si usuario existe
    const userRes = await pool.query('SELECT id FROM usuarios WHERE email = $1', [email]);
    let userId;
    if (userRes.rows.length === 0) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(plain, salt);
      const insertUser = await pool.query('INSERT INTO usuarios (nombre,email,password_hash,activo) VALUES ($1,$2,$3,TRUE) RETURNING id', [nombre, email, hash]);
      userId = insertUser.rows[0].id;
      console.log('Usuario creado:', userId);
    } else {
      userId = userRes.rows[0].id;
      console.log('Usuario ya existe:', userId);
      // opcional: actualizar hash para asegurar contraseña conocida
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(plain, salt);
      await pool.query('UPDATE usuarios SET password_hash=$1 WHERE id=$2', [hash, userId]);
      console.log('Password del usuario actualizada');
    }

    // 3) asociar rol
    const ur = await pool.query('SELECT * FROM usuario_rol WHERE usuario_id = $1 AND rol_id = $2', [userId, rolId]);
    if (ur.rows.length === 0) {
      await pool.query('INSERT INTO usuario_rol (usuario_id, rol_id) VALUES ($1,$2)', [userId, rolId]);
      console.log('Rol asociado al usuario');
    } else {
      console.log('Usuario ya tiene el rol asociado');
    }

    console.log('\nListo. Credenciales para pruebas:');
    console.log('email:', email);
    console.log('password:', plain);
    process.exit(0);
  } catch (err) {
    console.error('Error creando usuario de prueba:', err);
    process.exit(1);
  }
}

run();
