import { useEffect, useState } from 'react';
import API from '../api/api';

export default function Productos() {
  const [productos, setProductos] = useState([]);

  const cargar = async () => {
    const res = await API.get('/productos');
    setProductos(res.data);
  };

  useEffect(() => { cargar(); }, []);

  return (
    <div className="container mt-4">
      <h3>📦 Productos</h3>
      <table className="table table-hover mt-3">
        <thead><tr><th>ID</th><th>Nombre</th><th>Stock</th><th>Precio</th></tr></thead>
        <tbody>
          {productos.map(p => (<tr key={p.id}><td>{p.id}</td><td>{p.nombre}</td><td>{p.stock_actual}</td><td>${p.precio}</td></tr>))}
        </tbody>
      </table>
    </div>
  );
}
