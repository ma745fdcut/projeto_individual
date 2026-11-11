const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const pessoaRoutes = require('./routes/pessoaRoutes');
const cargoRoutes = require('./routes/cargoRoutes');

app.use('/pessoas', pessoaRoutes);
app.use('/cargos', cargoRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
  console.log(`Swagger em http://localhost:${port}/api-docs`);
});