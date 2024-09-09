const express = require('express');
const cors = require('cors'); // Importa el paquete de CORS
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes'); // Importa las rutas de autenticación
const projectRoutes = require('./routes/projectRoutes');
const userDataRoutes = require('./routes/userDataRoutes');

const app = express();

// Configuración básica de CORS: permite todas las solicitudes desde cualquier origen
app.use(cors());

app.use(bodyParser.json());
app.use('/auth', authRoutes); // Usa las rutas de autenticación
app.use('/projects', projectRoutes); // Usa las rutas de proyectos
app.use('/api', projectRoutes); // manejo de projectos
app.use('/userData', userDataRoutes); // manejo de projectos

// Inicia el servidor
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
