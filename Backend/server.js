import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';

import { swaggerUi, swaggerDocs } from './docs/swagger.js';
import sanitizeInput from './middlewares/sanitizeInput.js';


dotenv.config();
connectDB();
const app = express();
const PORT = process.env.PORT || 5000;
const api = process.env.API


/** middlewares */ 
// Apply the sanitization middleware
sanitizeInput(app);

// docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));




app.listen(PORT, (error) => {
    if(error) throw new Error("Error while connecting to server");
    console.log(`Sever is live and running at the http://localhost:${PORT}`)
})