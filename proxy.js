const express = require('express');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/sync', async (req, res) => {
  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbx3-gR46dJoqklzCZ7ttHTNl2bN9gOc0HBryWuCSyfgs2jPeNZ0MvCThZ6VTx8OCKh1/exec', {
      method: 'POST',
      body: JSON.stringify(req.body),
      headers: { 'Content-Type': 'application/json' }
    });

    const text = await response.text();
    res.send(text);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en el proxy');
  }
});

app.listen(3000, () => {
  console.log('Servidor proxy corriendo en http://localhost:3000');
});
