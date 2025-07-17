const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post("/crearArchivo", async (req, res) => {
  const { nombreArchivo, registros } = req.body;

  try {
    const respuesta = await fetch("https://script.google.com/macros/s/AKfycbx3-gR46dJoqklzCZ7ttHTNl2bN9gOc0HBryWuCSyfgs2jPeNZ0MvCThZ6VTx8OCKh1/exec", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombreArchivo, registros }),
    });

    const data = await respuesta.json();
    res.json({ success: true, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error al comunicarse con Google Script" });
  }
});

app.get("/", (req, res) => {
  res.send("Servidor proxy funcionando.");
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
