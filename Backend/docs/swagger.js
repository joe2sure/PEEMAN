import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Real Estate API',
      version: '1.0.0',
      description: 'Real Estate API Documentation',
    },
  },
  apis: ['./routes/**/*.js'], // Point to all .js files in the routes folder and its subfolders
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);


export { swaggerUi, swaggerDocs };
