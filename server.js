const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");

dotenv.config();

const app = express();


// database
connectDB();


// middleware
app.use(cors());
app.use(express.json());


// routes
const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");


app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);



app.get("/",(req,res)=>{
    res.send("Backend Running");
});


const PORT = process.env.PORT || 5000;


app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});