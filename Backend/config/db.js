// MongoDB configuration
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
// const options = {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     dbName: "peeman"
// }

const mongoUrl = process.env.MONGO_URI;


const connectDB = async () => {
    if(mongoose.connections[0].readyState){
        console.log("mongoDb already connected");
        return
    }
    try {
        await mongoose.connect(mongoUrl)
        console.log("connected successfully to the DB!");
    } catch (error) {
        console.log("Error while connecting to the Database", error.message)
    }
}

export default connectDB;

