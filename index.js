const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./db/mongoDatabase');
const dotenv = require('dotenv').config();

const app = express();
connectDB();
 
const port = process.env.PORT || 3000;

//The Built-in-middleware for POST and GET Request body
app.use(express.json());
app.use("/api/addresses", require("./routes/addressRoutes"))
app.use("/api/users", require("./routes/userRoutes"))
app.use(errorHandler);

    app.listen(port, () => {
        console.log(`Server is listening on post: ${port}`);
    })


