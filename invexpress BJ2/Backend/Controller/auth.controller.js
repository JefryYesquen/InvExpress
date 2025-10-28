import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { pool } from '../../Capa_de_Datos/databaseconnection.js';
import * as authService from "../Service/auth.services.js";
import nodemailer from "nodemailer";
import { handleRecoverPassword, handleResetPassword } from '../Service/auth.services.js';
export const login = async (req, res) => {

  try{
    // Aceptar tanto `password` (frontend) como `password_hash` (si se envía)
    const { email, password, password_hash } = req.body;
    const plainPassword = password || password_hash;

    if (!plainPassword) {
      return res.status(400).json({ message: 'Falta contraseña' });
    }

    if (process.env.NODE_ENV !== 'production') console.debug('[auth] login request for email:', email);

    const user = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    
    if (user.rows.length === 0) {
      if (process.env.NODE_ENV !== 'production') console.debug('[auth] no user found for email');
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }
    const validPassword = await bcrypt.compare(plainPassword, user.rows[0].password_hash);
    if (!validPassword) {
      if (process.env.NODE_ENV !== 'production') console.debug('[auth] password compare failed');
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }
    //verificar el estado del usuario
    if(!user.rows[0].activo){
      return res.status(403).json({ message: 'Usuario inactivo. Contacte al administrador.' });
    }

    //obtener el rol del usuario
    const rolResult = await pool.query(
      `SELECT r.nombre FROM roles r
       JOIN usuario_rol ur ON r.id = ur.rol_id
       WHERE ur.usuario_id = $1`, 
      [user.rows[0].id]
    );
    const rol = rolResult.rows.length > 0 ? rolResult.rows[0].nombre : null;

    const token = jwt.sign(
      { id: user.rows[0].id, nombre: user.rows[0].nombre, email: user.rows[0].email, rol: rol },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );
    res.status(200).json({ token, user: { id: user.rows[0].id, nombre: user.rows[0].nombre, email: user.rows[0].email, rol: rol } });

  } catch (error) {
    console.error('Error durante el login:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }

 
};

export const recoverPasswordController = async (req, res) => {
  try {
    const { email } = req.body;
    const result = await handleRecoverPassword(email);
    res.json({ message: result });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const resetPasswordController = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    const result = await handleResetPassword(token, password);
    res.json({ message: result });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};