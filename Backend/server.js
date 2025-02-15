import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import morgan from 'morgan'; // Logging
import helmet from 'helmet';
import cors from 'cors';

import { swaggerUi, swaggerDocs } from './docs/swagger.js';  // Swagger docs
import sanitizeInput from './middlewares/sanitizeInput.js';  // Sanitization middleware
import rateLimiter from './middlewares/rateLimiter.js';  // Rate limiter middleware
import logger from './logs/logger.js';

import authRoutes from './routes/users/authRoutes.js';
import profileRoutes from './routes/users/profileRoutes.js';
import userRoutes from './routes/users/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import posterRoutes from './routes/posterRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import couponRoutes from './routes/couponRoutes.js';
import propertyUserInteractionRoutes from './routes/propertyUserInteractionRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import formRoutes from './routes/formRoutes.js';


// Load environment variables
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Enable trust proxy (this is the key change to fix the rate-limit issue)
app.set('trust proxy', 1); // Trust the first proxy, you can adjust the number based on your setup

// Initialize database connection
connectDB();

// for developement
// const corsOptions = {
//     origin: "*",
//     "Access-Control-Allow-Origin": true,
//     optionSuccessStatus: 200,
// };

// CORS Configuration
const corsOptions = {
    origin: process.env.NODE_ENV === 'production' ? [
        "https://peemandevelopers.co.uk",
        "http://peemandevelopers.co.uk",
        "https://peeman-frontend.onrender.com"
    ] : "http://localhost:3000",  // Allow localhost for development
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200
};

/** Start of middlewares **/

// Body parsers
// app.use(express.json());  // development
//app.use(express.urlencoded({ extended: true }));  // development
app.use(express.json({ limit: '50mb' })); // production
app.use(express.urlencoded({ extended: true, limit: '50mb' }));  // production


// Enable CORS
app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

//  add more specific headers to your Helmet configuration for handling file uploads:
app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
    crossOriginEmbedderPolicy: false
}));

// Apply the sanitization middleware
sanitizeInput(app);

// Logger (using morgan)
app.use(morgan('combined', { stream: { write: (message) => logger.info(message.trim()) } }));

// Apply rate limiting to all API routes
app.use(rateLimiter);

/** End of middlewares **/

// Swagger documentation route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**=====  Routes  =====**/
const api = process.env.API;

app.use(`${api}/auth`, authRoutes);
app.use(`${api}/profile`, profileRoutes);
app.use(`${api}/user`, userRoutes);
app.use(`${api}/admin`, adminRoutes);
app.use(`${api}/poster`, posterRoutes);
app.use(`${api}/notification`, notificationRoutes);
app.use(`${api}/coupon`, couponRoutes);
app.use(`${api}/properties`, propertyUserInteractionRoutes);
app.use(`${api}/blog`, blogRoutes);
app.use(`${api}/forms`, formRoutes);

// Global Error handling in the server
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        msg: "Internal Server Error",
        error: err.message,
    });
});

// Start the server
app.listen(PORT, (error) => {
    if (error) throw new Error("Error while connecting to server");
    console.log(`Server is live and running at the http://localhost:${PORT}`);
    console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});

export default app;