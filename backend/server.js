const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const studyPlannerRoutes = require("./routes/studyPlannerRoutes");
require("dotenv").config();
const mongoose = require("mongoose");
const protect = require("./middleware/authMiddleware");

const app = express();

mongoose.connect(process.env.MONGO_URI)
.then(()=>{console.log("MongoDB connected")})
.catch((err)=>{console.log(err)});

app.use(cors());
app.use(express.json());
app.use("/api/auth",authRoutes);
app.use("/api", studyPlannerRoutes);

app.get("/",(req,res)=>{
    res.send("Backend running");
});

app.get("/profile", protect, (req,res)=>{
    console.log("Profile route hit");
    res.json({
        message:"Protected route accessed",
        user: req.user
    });
})

app.get("/my-plans", protect, (req,res) => {
    res.json({
        message:"Plans fetched successfully",
        plans:[
            "DSA",
            "ML",
            "React"
        ]
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Port running on ${PORT}`);
});