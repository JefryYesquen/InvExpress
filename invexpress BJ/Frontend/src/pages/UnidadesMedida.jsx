import { useEffect, useState } from 'react';
import API from '../api/api';
import Swal from 'sweetalert2';

export default function UnidadesMedida() {
  const [unidades, setUnidades] = useState([]);
  const [nombre, setNombre] = useState('');
  const [abreviatura, setAbreviatura] = useState('');

  const cargar = async () => {
    const res = await API.get('/unidades');
    setUnidades(res.data);
  };

  const guardar = async (e) => {
    e.preventDefault();
    try {
      await API.post('/unidades', { nombre, abreviatura });
      Swal.fire('Guardado', 'Unidad creada', 'success');
      setNombre(''); setAbreviatura('');
      cargar();
    } catch {
      Swal.fire('Error', 'No se pudo crear', 'error');
    }
  };

  useEffect(() => { cargar(); }, []);

  return (
    <div className="container mt-4">
      <h3>⚖️ Unidades de Medida</h3>
      <form onSubmit={guardar} className="d-flex gap-2 mb-3">
        <input className="form-control" placeholder="Nombre" value={nombre} onChange={(e)=>setNombre(e.target.value)} />
        <input className="form-control" placeholder="Abreviatura" value={abreviatura} onChange={(e)=>setAbreviatura(e.target.value)} />
        <button className="btn btn-success">Agregar</button>
      </form>
      <table className="table table-striped">
        <thead><tr><th>ID</th><th>Nombre</th><th>Abreviatura</th></tr></thead>
        <tbody>{unidades.map(u=>(<tr key={u.id}><td>{u.id}</td><td>{u.nombre}</td><td>{u.abreviatura}</td></tr>))}</tbody>
      </table>
    </div>
  );
}
