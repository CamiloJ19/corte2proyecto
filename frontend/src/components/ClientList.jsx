import React from "react";
import "../css/style.css";

function ClientList() {
  const clients = [
    { id: 1, name: "Carlos Pérez", email: "carlos@gmail.com", phone: "3001234567" },
    { id: 2, name: "Laura Gómez", email: "laura@gmail.com", phone: "3109876543" },
    { id: 3, name: "Andrés Rojas", email: "andres@gmail.com", phone: "3205678901" },
  ];

  return (
    <div>
      <h2>Lista de Clientes</h2>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Teléfono</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id}>
              <td>{client.id}</td>
              <td>{client.name}</td>
              <td>{client.email}</td>
              <td>{client.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ClientList;
