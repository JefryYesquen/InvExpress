import { Link, Outlet } from 'react-router-dom';
import React from 'react';

function DashboardLayout() {
  return (
    <div className="d-flex min-vh-100">
      <aside className="bg-dark text-white" style={{ width: 240 }}>
        {/* Logo/Título */}
        <div className="p-3 border-bottom border-secondary">
          <h5 className="mb-0">InvExpress</h5>
        </div>

        {/* Menú */}
        <nav className="p-3">
          {/* Principal */}
          <div className="mb-4">
            <Link to="/dashboard" className="d-flex align-items-center text-white text-decoration-none p-2 rounded hover-highlight">
              <span className="me-3">📊</span>
              <span>Dashboard</span>
            </Link>
          </div>

          {/* Inventario */}
          <div className="mb-4">
            <small className="text-muted text-uppercase ms-2">Inventario</small>
            <Link to="productos" className="d-flex align-items-center text-white text-decoration-none p-2 rounded hover-highlight">
              <span className="me-3">📦</span>
              <span>Productos</span>
            </Link>
            <Link to="categorias" className="d-flex align-items-center text-white text-decoration-none p-2 rounded hover-highlight">
              <span className="me-3">📑</span>
              <span>Categorías</span>
            </Link>
            <Link to="unidades" className="d-flex align-items-center text-white text-decoration-none p-2 rounded hover-highlight">
              <span className="me-3">⚖️</span>
              <span>Unidades</span>
            </Link>
          </div>

          {/* Ventas y Reportes */}
          <div className="mb-4">
            <small className="text-muted text-uppercase ms-2">Operaciones</small>
            <Link to="ventas" className="d-flex align-items-center text-white text-decoration-none p-2 rounded hover-highlight">
              <span className="me-3">💸</span>
              <span>Ventas</span>
            </Link>
            <Link to="reportes" className="d-flex align-items-center text-white text-decoration-none p-2 rounded hover-highlight">
              <span className="me-3">📈</span>
              <span>Reportes</span>
            </Link>
          </div>

          {/* Administración */}
          <div className="mb-4">
            <small className="text-muted text-uppercase ms-2">Administración</small>
            <Link to="usuarios" className="d-flex align-items-center text-white text-decoration-none p-2 rounded hover-highlight">
              <span className="me-3">👤</span>
              <span>Usuarios</span>
            </Link>
            <Link to="roles" className="d-flex align-items-center text-white text-decoration-none p-2 rounded hover-highlight">
              <span className="me-3">🔐</span>
              <span>Roles</span>
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

export default DashboardLayout;

// (administrar productos/categorías/unidades),🔹 (gestionar ventas/devoluciones), (ver reportes de ventas/inventario), (gestionar usuarios/roles)ventas,