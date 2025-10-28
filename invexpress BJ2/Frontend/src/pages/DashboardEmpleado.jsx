import { useEffect, useState } from 'react';
import API from '../api/api';

export default function DashboardEmpleado() {
  const [resumen, setResumen] = useState({ productos:0, ventas:0, stock:0 });

  useEffect(() => {
    (async () => {
      const res = await API.get('/reportes/resumen');
      setResumen(res.data);
    })();
  }, []);

  return (
    <div className="container mt-4">
      <h3> Panel de Control - Empleado</h3>
      <div className="row mt-4">
        <div className="col-md-4">
          <div className="card p-3 shadow-sm">
            <h5>🏷️ Productos en Inventario</h5>
            <h2>{resumen.productos || 0}</h2>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card p-3 shadow-sm">
            <h5>📦 Stock Total</h5>
            <h2>{resumen.stock || 0}</h2>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card p-3 shadow-sm">
            <h5>💰 Ventas del Día</h5>
            <h2>{resumen.ventas || 0}</h2>
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-12">
          <div className="card p-4">
            <h4>🎯 Acciones Rápidas</h4>
            <div className="list-group">
              <a href="/dashboard/productos" className="list-group-item list-group-item-action">
                📋 Consultar Inventario
              </a>
              <a href="/dashboard/ventas" className="list-group-item list-group-item-action">
                💳 Registrar Nueva Venta
              </a>
              <a href="/dashboard/reportes" className="list-group-item list-group-item-action">
                📊 Ver Reportes del Día
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

//(resumen de ventas/inventario),🔹 (solo lectura de productos), (consulta inventario),(registrar ventas (registrar devoluciones),
