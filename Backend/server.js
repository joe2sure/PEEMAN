import express from 'express';

const app = express();
const PORT = process.env.PORT || 5000;

app.listen(PORT, (error) => {
    if(error) throw new Error("Error while connecting to server");
    console.log(`Sever is live and running at the http://localhost:${PORT}`)
})