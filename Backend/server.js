import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import morgan from 'morgan'; //Logging
import helmet from 'helmet';
import cors from 'cors';

import { swaggerUi, swaggerDocs } from './docs/swagger.js';  // Swagger docs
import sanitizeInput from './middlewares/sanitizeInput.js';  // Sanitization middleware
import rateLimiter from './middlewares/rateLimiter.js';  // Rate limiter middleware
import logger from './logs/logger.js'

import authRoutes from './routes/users/authRoutes.js';
import profileRoutes from './routes/users/profileRoutes.js';
import userRoutes from './routes/users/userRoutes.js';


// Load environment variables
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;


// initialize database connection
connectDB();

const corsOptions = {
    origin: "*",
    "Access-Control-Allow-Origin": true,
    optionSuccessStatus: 200,
  };



/** Start of middlewares **/ 

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cors(corsOptions));
app.use(helmet());


// Apply the sanitization middleware
sanitizeInput(app);


// Logger (using morgan)
// app.use(morgan('dev'));
// app.use(morgan("tiny"));
app.use(morgan('combined', { stream: { write: (message) => logger.info(message.trim()) } }));

// Apply rate limiting to all API routes
app.use(rateLimiter);

/** End of middlewares **/


// Swagger documentation route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));





/**=====  Routes  =====**/ 
const api = process.env.API

app.use(`${api}/auth`, authRoutes);
app.use(`${api}/profile`, profileRoutes);
app.use(`${api}/user`, userRoutes);
// app.use('/api/properties', require('./routes/propertyRoutes'));
// app.use('/api/admin', require('./routes/adminRoutes'));



// global Error handling in the server 
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        msg: "Internal Server Error",
        error: err.message,
    })
  });



// Start the server
app.listen(PORT, (error) => {
    if(error) throw new Error("Error while connecting to server");
    console.log(`Sever is live and running at the http://localhost:${PORT}`);
    console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
})


export default app;