import nodemailer from 'nodemailer';

// Function to send email
const sendEmail = async (options) => {
  // Create transporter using nodemailer
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVICE,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_PORT == 465, // true for 465 (SSL), false for 587 (TLS)
    auth: {
      user: process.env.EMAIL_USER, // Your email
      pass: process.env.EMAIL_PASS, // Your password or app-specific password
    },
  });

  // Email options
  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender's email address
    to: options.email, // Recipient's email address
    subject: options.subject, // Email subject
    text: options.message, // Email message
  };

  // Send the email
  await transporter.sendMail(mailOptions);
};

export default sendEmail;




// import nodemailer from 'nodemailer';


// const sendEmail = async (options) => {
//   const transporter = nodemailer.createTransport({
//     service: 'Gmail',
//     auth: {
//       user: process.env.EMAIL_USERNAME,
//       pass: process.env.EMAIL_PASSWORD,
//     },
//   });

//   const mailOptions = {
//     from: 'YourApp <yourapp@example.com>',
//     to: options.email,
//     subject: options.subject,
//     text: options.message,
//   };

//   await transporter.sendMail(mailOptions);
// };

// export default sendEmail;


