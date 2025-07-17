import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Servidor proxy funcionando.");
});

app.post("/crearArchivo", async (req, res) => {
  try {
    const { nombreArchivo, registros } = req.body;

    const response = await fetch("https://script.google.com/macros/s/AKfycbx3-gR46dJoqklzCZ7ttHTNl2bN9gOc0HBryWuCSyfgs2jPeNZ0MvCThZ6VTx8OCKh1/exec", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombreArchivo, registros })
    });

    const data = await response.json();
    res.json({ success: true, message: "Datos enviados correctamente", data });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error al enviar datos", error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
