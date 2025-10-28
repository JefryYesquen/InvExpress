import bcrypt from 'bcryptjs';
import { pool } from './databaseconnection.js';

async function rehashAll() {
  try {
    const result = await pool.query('SELECT id, email FROM usuarios');
    for (const row of result.rows) {
      const userId = row.id;
      const newPlain = 'admin123';  // O pedir que el usuario reestablezca
      const salt = await bcrypt.genSalt(10);
      const newHash = await bcrypt.hash(newPlain, salt);
      await pool.query('UPDATE usuarios SET password_hash = $1 WHERE id = $2', [newHash, userId]);
      console.log(`Usuario ${userId} re-hashed`);
    }
    console.log('Proceso terminado');
    process.exit(0);
  } catch (error) {
    console.error('Error en rehash:', error);
    process.exit(1);
  }
}

rehashAll();
