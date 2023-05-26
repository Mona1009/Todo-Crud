const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const app = express()
dotenv.config();

//db connection
mongoose.connect(process.env.DB_CONNECT, { useUnifiedTopology: true, useNewUrlParser: false }).then(
    function (value) {
        console.log("Connected to MongoDB");
    },
    function (reason) {
        console.log("Failed to connect to MongoDB", reason);
    }
);

//import routes
const itemRoutes = require("./routes/ItemRoutes");
const userRoutes = require("./routes/UserRoutes");
const { verifyAuth } = require("./middleware/auth");

// Middlewares
app.use(express.json())

//routes middleware
app.use("/api/items", verifyAuth, itemRoutes);
app.use("/api/user", userRoutes);

//creating server
app.listen(8080, () =>
    console.log("Server is Running on port 8080")
)