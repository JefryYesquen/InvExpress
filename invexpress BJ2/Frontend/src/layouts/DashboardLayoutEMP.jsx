import { Link, Outlet, useLocation } from 'react-router-dom';
import React from 'react';
import { useAuth } from '../context/AuthContext';

function DashboardLayoutEMP() {
  const location = useLocation();
  const { logout } = useAuth();
  
  const isActive = (path) => {
    return location.pathname === '/dashboard' + (path === 'index' ? '' : path);
  };

  const handleLogout = () => {
    logout();
    // La redirección la manejará el AuthContext
  };

  return (
    <div className="d-flex min-vh-100">
      <aside className="bg-dark text-white" style={{ width: 250 }}>
        {/* Logo/Título */}
        <div className="p-4 border-bottom border-secondary">
          <h4 className="mb-0 d-flex align-items-center">
            <span className="me-2">🏪</span>
            InvExpress
          </h4>
          <small className="text-muted">Panel de Empleado</small>
        </div>

        {/* Menú */}
        <nav className="py-3">
          {/* Principal - Resumen */}
          <div className="mb-4">
            <Link to="/dashboard" className="d-flex align-items-center text-white text-decoration-none p-2 rounded hover-highlight">
              <span className="me-3">📊</span>
              <span>Resumen</span>
            </Link>
          </div>

          {/* Consulta de Inventario */}
          <div className="mb-4">
            <small className="text-muted text-uppercase ms-2">Inventario</small>
            <Link to="productos" className="d-flex align-items-center text-white text-decoration-none p-2 rounded hover-highlight">
              <span className="me-3">📦</span>
              <span>Consultar Productos</span>
            </Link>
          </div>

          {/* Ventas y Devoluciones */}
          <div className="mb-4">
            <small className="text-muted text-uppercase ms-2">Operaciones</small>
            <Link to="ventas" className="d-flex align-items-center text-white text-decoration-none p-2 rounded hover-highlight">
              <span className="me-3">�</span>
              <span>Registrar Venta</span>
            </Link>
            <Link to="devoluciones" className="d-flex align-items-center text-white text-decoration-none p-2 rounded hover-highlight">
              <span className="me-3">↩️</span>
              <span>Registrar Devolución</span>
            </Link>
          </div>

          {/* Reportes del día */}
          <div className="mb-4">
            <small className="text-muted text-uppercase ms-2">Informes</small>
            <Link to="reportes" className="d-flex align-items-center text-white text-decoration-none p-2 rounded hover-highlight">
              <span className="me-3">�</span>
              <span>Reportes del Día</span>
            </Link>
          </div>

          {/* Cerrar Sesión */}
          <div className="mt-auto">
            <Link to="/" className="d-flex align-items-center text-danger text-decoration-none p-2 rounded hover-highlight">
              <span className="me-3"></span>
              <span>Cerrar Sesión</span>
            </Link>
          </div>
        </nav>
      </aside>

      {/* Contenido Principal */}
      <main className="flex-grow-1 bg-light">
        <Outlet />
      </main>

      <style>{`
        .hover-highlight:hover {
          background: rgba(255,255,255,0.1);
          transition: background-color 0.2s;
        }
      `}</style>
    </div>
  );
}

export default DashboardLayoutEMP;
//(resumen de ventas/inventario),🔹 (solo lectura de productos), (consulta inventario),(registrar ventas (registrar devoluciones),
