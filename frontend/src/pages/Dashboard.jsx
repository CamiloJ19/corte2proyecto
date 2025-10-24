import React, { useState } from "react";
import "../css/style.css";

function Dashboard({ usuario, setUsuarioActivo }) {
  const [clientes, setClientes] = useState([
    { nombre: "Cliente 1", email: "cliente1@gmail.com", ciudad: "Bogotá", tipo: "Premium" },
    { nombre: "Cliente 2", email: "cliente2@gmail.com", ciudad: "Medellín", tipo: "Normal" },
  ]);

  const [nuevoCliente, setNuevoCliente] = useState({
    nombre: "",
    email: "",
    ciudad: "",
    tipo: "",
  });

  const [editandoIndex, setEditandoIndex] = useState(null);

  const handleChange = (e) => {
    setNuevoCliente({
      ...nuevoCliente,
      [e.target.name]: e.target.value,
    });
  };

  const handleAgregar = (e) => {
    e.preventDefault();

    if (!nuevoCliente.nombre || !nuevoCliente.email || !nuevoCliente.ciudad || !nuevoCliente.tipo) {
      alert("Por favor completa todos los campos");
      return;
    }

    if (editandoIndex !== null) {
      // Actualizar cliente existente
      const clientesActualizados = [...clientes];
      clientesActualizados[editandoIndex] = nuevoCliente;
      setClientes(clientesActualizados);
      setEditandoIndex(null);
      alert("Cliente actualizado ✅");
    } else {
      // Agregar nuevo cliente
      setClientes([...clientes, nuevoCliente]);
      alert("Cliente agregado ✅");
    }

    setNuevoCliente({ nombre: "", email: "", ciudad: "", tipo: "" });
  };

  const handleEditar = (index) => {
    setNuevoCliente(clientes[index]);
    setEditandoIndex(index);
  };

  const handleEliminar = (index) => {
    if (window.confirm("¿Seguro que deseas eliminar este cliente?")) {
      const nuevosClientes = clientes.filter((_, i) => i !== index);
      setClientes(nuevosClientes);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h2>Panel de Control</h2>

        <div className="welcome-header">
          <p className="welcome-text">
            Bienvenido, <b>{usuario}</b> 👋
          </p>
          <button className="logout-btn" onClick={() => setUsuarioActivo(null)}>
            Cerrar Sesión
          </button>
        </div>

        <div className="form-section">
          <h3>{editandoIndex !== null ? "Editar cliente" : "Registrar nuevo cliente"}</h3>
          <form onSubmit={handleAgregar} className="form-grid">
            <input
              type="text"
              placeholder="Nombre"
              name="nombre"
              value={nuevoCliente.nombre}
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Correo"
              name="email"
              value={nuevoCliente.email}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Ciudad"
              name="ciudad"
              value={nuevoCliente.ciudad}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Tipo de Cliente"
              name="tipo"
              value={nuevoCliente.tipo}
              onChange={handleChange}
            />
            <button type="submit" className="add-btn">
              {editandoIndex !== null ? "Actualizar" : "Agregar Cliente"}
            </button>
          </form>
        </div>

        <div className="list-section">
          <h3>Lista de Clientes</h3>
          {clientes.length > 0 ? (
            <ul>
              {clientes.map((c, index) => (
                <li key={index} className="cliente-item">
                  <span className="cliente-nombre">{c.nombre}</span>
                  <span>{c.email}</span>
                  <span>{c.ciudad}</span>
                  <span className="cliente-tipo">{c.tipo}</span>
                  <div className="acciones">
                    <button
                      className="edit-btn"
                      onClick={() => handleEditar(index)}
                    >
                      ✏️ Editar
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleEliminar(index)}
                    >
                      🗑️ Eliminar
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-clientes">Aún no hay clientes registrados.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
