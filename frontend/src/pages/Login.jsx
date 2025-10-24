import React, { useState } from "react";
import "../css/style.css";
import Dashboard from "./Dashboard";
import Register from "./Register";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usuarioActivo, setUsuarioActivo] = useState(null);
  const [mostrarRegistro, setMostrarRegistro] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación sencilla (en un proyecto real, aquí iría la API)
    if (username && password) {
      setUsuarioActivo(username);
    } else {
      alert("Por favor, ingresa usuario y contraseña.");
    }
  };

  if (usuarioActivo) {
    return <Dashboard usuario={usuarioActivo} setUsuarioActivo={setUsuarioActivo} />;
  }

  if (mostrarRegistro) {
    return <Register volverLogin={() => setMostrarRegistro(false)} />;
  }

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: "400px", margin: "80px auto" }}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Iniciar Sesión
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Entrar</button>
        </form>

        <p style={{ textAlign: "center", marginTop: "10px" }}>
          ¿No tienes cuenta?
          <button
            style={{
              background: "none",
              color: "blue",
              border: "none",
              cursor: "pointer",
              textDecoration: "underline",
            }}
            onClick={() => setMostrarRegistro(true)}
          >
            Crear nuevo usuario
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
