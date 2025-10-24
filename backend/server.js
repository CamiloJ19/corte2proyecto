import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// --- Simulación de base de datos en memoria ---
const users = [
  { id: 1, username: "admin", password: bcrypt.hashSync("123456", 8) }
];

const clients = [
  { id: 1, name: "Carlos Pérez", email: "carlos@gmail.com", phone: "3001234567" },
  { id: 2, name: "Laura Gómez", email: "laura@gmail.com", phone: "3109876543" },
  { id: 3, name: "Andrés Rojas", email: "andres@gmail.com", phone: "3205678901" }
];

// --- LOGIN ---
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);

  if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) return res.status(401).json({ message: "Contraseña incorrecta" });

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || "secreto", { expiresIn: "2h" });
  res.json({ message: "Login exitoso", token });
});

// --- LISTA DE CLIENTES (requiere token) ---
app.get("/api/clients", (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ message: "Token requerido" });

  const token = authHeader.split(" ")[1];
  try {
    jwt.verify(token, process.env.JWT_SECRET || "secreto");
    res.json(clients);
  } catch (err) {
    res.status(401).json({ message: "Token inválido o expirado" });
  }
});

// --- Servidor ---
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Servidor backend corriendo en http://localhost:${PORT}`));
