import React, { useState, useEffect } from "react";
import axios from "axios";

const CategoriasPage = () => {
  const [categorias, setCategorias] = useState([]);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [editando, setEditando] = useState(false);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

  const API_URL = "http://localhost:4000/api/categorias";

  useEffect(() => {
    obtenerCategorias();
  }, []);

  const obtenerCategorias = async () => {
    try {
      const res = await axios.get(API_URL);
      setCategorias(res.data);
    } catch (error) {
      console.error("Error al obtener las categorías:", error);
    }
  };

  const guardarCategoria = async (e) => {
    e.preventDefault();
    try {
      if (editando) {
        await axios.put(`${API_URL}/${categoriaSeleccionada.id}`, { nombre, descripcion });
      } else {
        await axios.post(API_URL, { nombre, descripcion });
      }
      setNombre("");
      setDescripcion("");
      setEditando(false);
      obtenerCategorias();
    } catch (error) {
      console.error("Error al guardar la categoría:", error);
    }
  };

  const editarCategoria = (categoria) => {
    setEditando(true);
    setCategoriaSeleccionada(categoria);
    setNombre(categoria.nombre);
    setDescripcion(categoria.descripcion);
  };

  const eliminarCategoria = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar esta categoría?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        obtenerCategorias();
      } catch (error) {
        console.error("Error al eliminar la categoría:", error);
      }
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">{editando ? "Editar Categoría" : "Registrar Categoría"}</h2>
      <form onSubmit={guardarCategoria} className="mb-4">
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <textarea
            className="form-control"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary me-2">
          {editando ? "Actualizar" : "Guardar"}
        </button>
        {editando && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              setEditando(false);
              setNombre("");
              setDescripcion("");
            }}
          >
            Cancelar
          </button>
        )}
      </form>

      <h3>Listado de Categorías</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((cat) => (
            <tr key={cat.id}>
              <td>{cat.id}</td>
              <td>{cat.nombre}</td>
              <td>{cat.descripcion}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => editarCategoria(cat)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => eliminarCategoria(cat.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoriasPage;
