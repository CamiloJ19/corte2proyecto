import { useState } from "react";
import "./App.css";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  const [usuarioActivo, setUsuarioActivo] = useState(null);

  return (
    <div className="app-container">
      {!usuarioActivo ? (
        <Login setUsuarioActivo={setUsuarioActivo} />
      ) : (
        <Dashboard usuario={usuarioActivo} setUsuarioActivo={setUsuarioActivo} />
      )}
    </div>
  );
}

export default App;
