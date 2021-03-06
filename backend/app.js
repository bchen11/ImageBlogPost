const path = require('path');
const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const postsRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");


const exp = require('constants');

const app = express();

mongoose.connect("mongodb+srv://bchen11:" + process.env.MONGO_ATLAS_PW + "@cluster0.ra34u.mongodb.net/node-angular?&w=majority")
.then(() =>{
    console.log('Connected to DB');
})
.catch(() => {
    console.log('Connection failed');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use("/images", express.static(path.join("images")));
app.use("/", express.static(path.join(__dirname, "angular")));

app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    next();
});

app.use('/api/posts',postsRoutes);
app.use('/api/user',userRoutes);
app.use((req,res,next) => {
    res.sendFile(path.join(__dirname,"augular","index/html"));
});




module.exports = app;