import express from "express";

const app = express();

app.get("/" ,(req , res)=>{
    res.send("Welcome to the ticket reservation system");
});

export default app;