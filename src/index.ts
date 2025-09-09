import express from "express";
import api from "./api/api.js";
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const app = express();
const port = process.env.PORT || 3000;

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Fee Calculator API',
      version: '1.0.0',
      description: 'API for calculating fees based on time periods',
    },
    servers: [
      {
        url: process.env.NODE_ENV === 'production' ? 'https://fee-api.onrender.com/api-docs/' : `http://localhost:${port}`,
        description: process.env.NODE_ENV === 'production' ? 'Production server' : 'Development server',
      },
    ],
  },
  apis: process.env.NODE_ENV === 'production' ? ['./dist/api/*.js'] : ['./src/api/*.ts'], // Path to the API docs
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Middleware to parse JSON
app.use(express.json());

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => {
	res.send("Hello");
});

// Mount the API routes
app.use('/api', api);

app.listen(port, () => {
	console.log(`Server working on port ${port}`);
	console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
});
