import React, { useState, useEffect } from "react";
import API from "../api/api";
import Swal from "sweetalert2";
import './crearProducto.css'

const CrearProducto = ({ onSubmit }) => {
  const [categorias, setCategorias] = useState([]);
  const [unidades, setUnidades] = useState([]);
  const [formData, setFormData] = useState({
    sku: "",
    nombre: "",
    precio: "",
    stock_actual: "",
    categoria_id: "",
    unidad_id: "",
  });
  const [errores, setErrores] = useState({});
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState("");

  // Cargar categorías y unidades al montar
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, uniRes] = await Promise.all([
          API.get("/categorias"),
          API.get("/unidades"),
        ]);
        setCategorias(catRes.data);
        setUnidades(uniRes.data);
      } catch (error) {
        console.error("Error al cargar datos:", error);
        Swal.fire("Error", "No se pudieron cargar categorías o unidades", "error");
      }
    };
    fetchData();
  }, []);

  const validar = () => {
    const newErrores = {};
    if (!formData.sku.trim()) newErrores.sku = "El SKU es obligatorio";
    if (!formData.nombre.trim()) newErrores.nombre = "El nombre es obligatorio";
    if (!formData.precio || Number(formData.precio) < 0)
      newErrores.precio = "El precio debe ser un número válido no negativo";
    if (formData.stock_actual === "" || !/^\d+$/.test(formData.stock_actual))
      newErrores.stock_actual = "El stock actual debe ser un número entero no negativo";
    if (!formData.categoria_id) newErrores.categoria_id = "La categoría es obligatoria";
    if (!formData.unidad_id) newErrores.unidad_id = "La unidad es obligatoria";

    setErrores(newErrores);
    return Object.keys(newErrores).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrores((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validar()) return;

    setCargando(true);
    setMensaje("");

    try {
      const payload = {
        ...formData,
        precio: parseFloat(formData.precio),
        stock_actual: parseInt(formData.stock_actual),
        categoria_id: parseInt(formData.categoria_id),
        unidad_id: parseInt(formData.unidad_id),
      };

      const response = await API.post("/productos", payload);

      setMensaje(`Producto "${formData.nombre}" creado exitosamente.`);
      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: `Producto "${formData.nombre}" creado exitosamente.`,
        timer: 2000,
        showConfirmButton: false,
      });

      setFormData({
        sku: "",
        nombre: "",
        precio: "",
        stock_actual: "",
        categoria_id: "",
        unidad_id: "",
      });

      if (onSubmit) onSubmit();
    } catch (error) {
      console.error("Error al crear producto:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error al guardar el producto.",
      });
      setMensaje("Error al guardar el producto.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="producto-form card p-4 shadow-sm">
      <h2 className="mb-4 text-center">Registrar Producto</h2>

      {/* SKU */}
      <div className="form-group mb-3">
        <label>SKU*:</label>
        <input
          type="text"
          name="sku"
          value={formData.sku}
          onChange={handleChange}
          className={`form-control ${errores.sku ? "is-invalid" : ""}`}
        />
        {errores.sku && <div className="invalid-feedback">{errores.sku}</div>}
      </div>

      {/* Nombre */}
      <div className="form-group mb-3">
        <label>Nombre*:</label>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          className={`form-control ${errores.nombre ? "is-invalid" : ""}`}
        />
        {errores.nombre && <div className="invalid-feedback">{errores.nombre}</div>}
      </div>

      {/* Precio */}
      <div className="form-group mb-3">
        <label>Precio*:</label>
        <input
          type="number"
          name="precio"
          value={formData.precio}
          onChange={handleChange}
          min="0"
          step="0.01"
          className={`form-control ${errores.precio ? "is-invalid" : ""}`}
        />
        {errores.precio && <div className="invalid-feedback">{errores.precio}</div>}
      </div>

      {/* Stock */}
      <div className="form-group mb-3">
        <label>Stock Actual*:</label>
        <input
          type="number"
          name="stock_actual"
          value={formData.stock_actual}
          onChange={handleChange}
          min="0"
          className={`form-control ${errores.stock_actual ? "is-invalid" : ""}`}
        />
        {errores.stock_actual && <div className="invalid-feedback">{errores.stock_actual}</div>}
      </div>

      {/* Categoría */}
      <div className="form-group mb-3">
        <label>Categoría*:</label>
        <select
          name="categoria_id"
          value={formData.categoria_id}
          onChange={handleChange}
          className={`form-select ${errores.categoria_id ? "is-invalid" : ""}`}
        >
          <option value="">-- Seleccionar categoría --</option>
          {categorias.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.nombre}
            </option>
          ))}
        </select>
        {errores.categoria_id && <div className="invalid-feedback">{errores.categoria_id}</div>}
      </div>

      {/* Unidad */}
      <div className="form-group mb-4">
        <label>Unidad*:</label>
        <select
          name="unidad_id"
          value={formData.unidad_id}
          onChange={handleChange}
          className={`form-select ${errores.unidad_id ? "is-invalid" : ""}`}
        >
          <option value="">-- Seleccionar unidad --</option>
          {unidades.map((u) => (
            <option key={u.id} value={u.id}>
              {u.nombre}
            </option>
          ))}
        </select>
        {errores.unidad_id && <div className="invalid-feedback">{errores.unidad_id}</div>}
      </div>

      <button type="submit" className="btn btn-primary w-100" disabled={cargando}>
        {cargando ? "Guardando..." : "Guardar producto"}
      </button>

      {mensaje && <p className="mt-3 text-success text-center">{mensaje}</p>}
    </form>
  );
};

export default CrearProducto;
