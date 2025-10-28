import { Routes, Route } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import Login from '../pages/Login';
import RecuperarContrasena from '../pages/RecuperarContrasena';
import Dashboard from '../pages/Dashboard';
import DashboardEmpleado from '../pages/DashboardEmpleado';
import Productos from '../pages/Productos';
import Categorias from '../pages/Categorias';
import UnidadesMedida from '../pages/UnidadesMedida';
import Usuarios from '../pages/Usuarios';
import Ventas from '../pages/Ventas';
import Reportes from '../pages/Reportes';
import NotFound from '../pages/NotFound';
import DashboardLayoutEMP from '../layouts/DashboardLayoutEMP';
import CrearProducto from '../pages/CrearProducto';
import RestablecerContrasena from "../pages/RestablecerContrasena";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/recuperarcontrasena" element={<RecuperarContrasena />} />
      <Route path="/restablecercontrasena/:token" element={<RestablecerContrasena />} />
      {/* Ruta para administradores */}
      <Route path="/admin" element={<DashboardLayout />}>
        <Route index element={<Dashboard/>} />
        <Route path="productos" element={<Productos />} />
        <Route path="productos/crear" element={<CrearProducto />} />
        router.post ('/productos/crear', crearProducto);
        <Route path="categorias" element={<Categorias />} />
        <Route path="unidades" element={<UnidadesMedida />} />
        <Route path="usuarios" element={<Usuarios />} />
        <Route path="ventas" element={<Ventas />} />
        <Route path="reportes" element={<Reportes />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Ruta para empleados */}
      <Route path="/dashboard" element={<DashboardLayoutEMP />}>
        <Route index element={<DashboardEmpleado/>} />
        <Route path="productos" element={<Productos />} />
        <Route path="categorias" element={<Categorias />} />
        <Route path="unidades" element={<UnidadesMedida />} />
        <Route path="usuarios" element={<Usuarios />} />
        <Route path="ventas" element={<Ventas />} />
        <Route path="reportes" element={<Reportes />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
