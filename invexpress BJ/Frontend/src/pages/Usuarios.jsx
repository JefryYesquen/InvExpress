import { useEffect, useState } from 'react';
import API from '../api/api';
import Swal from 'sweetalert2';

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rol, setRol] = useState('empleado');

  const cargar = async () => {
    const res = await API.get('/usuarios');
    setUsuarios(res.data);
  };

  const guardar = async (e) => {
    e.preventDefault();
    try {
      await API.post('/usuarios', { nombre, email, password, rol });
      Swal.fire('Creado', 'Usuario agregado con éxito', 'success');
      setNombre(''); setEmail(''); setPassword(''); setRol('empleado');
      cargar();
    } catch {
      Swal.fire('Error', 'No se pudo crear el usuario', 'error');
    }
  };

  useEffect(() => { cargar(); }, []);

  return (
    <div className="container mt-4">
      <h3>👤 Usuarios</h3>
      <form onSubmit={guardar} className="d-flex gap-2 mb-3">
        <input className="form-control" placeholder="Nombre" value={nombre} onChange={(e)=>setNombre(e.target.value)} />
        <input className="form-control" placeholder="Correo" value={email} onChange={(e)=>setEmail(e.target.value)} />
        <input className="form-control" type="password" placeholder="Contraseña" value={password} onChange={(e)=>setPassword(e.target.value)} />
        <select className="form-select" value={rol} onChange={(e)=>setRol(e.target.value)} style={{maxWidth: 180}}>
          <option value="administrador">Administrador</option>
          <option value="empleado">Empleado</option>
        </select>
        <button className="btn btn-success">Agregar</button>
      </form>
      <table className="table table-bordered">
        <thead><tr><th>ID</th><th>Nombre</th><th>Email</th><th>Rol</th><th>Activo</th></tr></thead>
        <tbody>
          {usuarios.map(u => (
            <tr key={u.id}><td>{u.id}</td><td>{u.nombre}</td><td>{u.email}</td><td>{u.rol || u.role || '—'}</td><td>{u.activo ? '✅' : '❌'}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
