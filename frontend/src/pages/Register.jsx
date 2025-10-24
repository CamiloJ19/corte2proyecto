import React, { useState } from "react";
import "../css/style.css";

function Register({ volverLogin }) {
  const [newUser, setNewUser] = useState("");
  const [newPass, setNewPass] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    if (newUser && newPass) {
      alert(`Usuario ${newUser} creado con éxito ✅`);
      volverLogin(); // Vuelve al login
    } else {
      alert("Por favor completa todos los campos.");
    }
  };

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: "400px", margin: "80px auto" }}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Crear Nuevo Usuario
        </h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Nuevo Usuario"
            value={newUser}
            onChange={(e) => setNewUser(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
          />
          <button type="submit">Registrar</button>
        </form>

        <p style={{ textAlign: "center", marginTop: "10px" }}>
          <button
            style={{
              background: "none",
              color: "blue",
              border: "none",
              cursor: "pointer",
              textDecoration: "underline",
            }}
            onClick={volverLogin}
          >
            Volver al Login
          </button>
        </p>
      </div>
    </div>
  );
}

export default Register;
