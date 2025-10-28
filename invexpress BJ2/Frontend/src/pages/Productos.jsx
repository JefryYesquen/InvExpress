import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const navigate = useNavigate();

  const cargar = async () => {
    try {
      const res = await API.get("/productos");
      setProductos(res.data);
    } catch (error) {
      console.error("Error al cargar productos:", error);
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  return (
    <div className="container mt-5">
      {/* Cabecera */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">📦 Productos</h2>
        <button
          className="btn btn-success"
          onClick={() => navigate("/admin/productos/crear")}
        >
          + Crear nuevo producto
        </button>
      </div>

      {/* Tabla */}
      <div className="table-responsive shadow-sm rounded">
        <table className="table table-striped table-hover align-middle mb-0">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Stock</th>
              <th>Precio</th>
            </tr>
          </thead>
          <tbody>
            {productos.length > 0 ? (
              productos.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.nombre}</td>
                  <td>{p.stock_actual}</td>
                  <td>${Number(p.precio).toFixed(2)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center text-muted py-4">
                  No hay productos registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
