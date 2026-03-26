const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRouter = require("./routers/auth");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();   // connect database

app.use('/api', authRouter);

app.listen(5000, () => {
    console.log("Server running on port 5000");
});