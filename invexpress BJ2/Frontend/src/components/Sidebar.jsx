import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const role = (user && (user.role || user.rol || '')).toString().toLowerCase();

  const handleLogout = () => {
    logout();
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="bg-dark text-white vh-100 p-3" style={{ width: '240px' }}>
      <h5>Menú</h5>
      <ul className="list-unstyled">
        <li><Link to="/dashboard" className="text-white text-decoration-none">Dashboard</Link></li>
        <li className="mt-3">
          <button onClick={handleLogout} className="btn btn-link p-0 text-danger">Cerrar sesión</button>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
