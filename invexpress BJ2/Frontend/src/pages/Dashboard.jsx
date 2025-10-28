import { useEffect, useState } from 'react';
import API from '../api/api';

export default function Dashboard() {
  const [resumen, setResumen] = useState({ productos:0, ventas:0, stock:0 });

  useEffect(() => {
    (async () => {
      const res = await API.get('/reportes/resumen');
      setResumen(res.data);
    })();
  }, []);

  return (
    <div className="container mt-4">
      <h3>📊 Panel de Control</h3>
      <div className="row mt-4">
        <div className="col-md-4"><div className="card p-3 shadow-sm"><h5>Total Productos</h5><h2>{resumen.productos}</h2></div></div>
        <div className="col-md-4"><div className="card p-3 shadow-sm"><h5>Total Ventas</h5><h2>{resumen.ventas}</h2></div></div>
        <div className="col-md-4"><div className="card p-3 shadow-sm"><h5>Stock Global</h5><h2>{resumen.stock}</h2></div></div>
      </div>
    </div>
  );
}
