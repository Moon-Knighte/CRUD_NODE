const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGODB_URI);
        console.log("Database Connected: ", connect.connection.host,
       connect.connection.name, connect.connection.port );

       
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}

module.exports = connectDB;