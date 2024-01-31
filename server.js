const express = require('express');
require("dotenv").config()



const app = express();
const post = process.env.PORT || 8888;
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.listen(post, ()=>{
    console.log("server running")
})