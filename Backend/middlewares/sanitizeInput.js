import ExpressMongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';

// Sanitize user input to prevent NoSQL injection and XSS attacks
const sanitizeInput = (app) => {
    // Prevent NoSQL injection
    app.use(ExpressMongoSanitize());
  
    // Prevent XSS attacks
    app.use(xss());
};

export default sanitizeInput;
