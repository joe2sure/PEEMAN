import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Real Estate API',
            version: '1.0.0',
            description: 'API documentation for Real Estate Application',
        },
        servers: [
            { url: 'http://localhost:5000' },
        ],
    },
    apis: ['../routes/*.js']  // Points to where your route files are located
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);


export { swaggerUi, swaggerDocs };
