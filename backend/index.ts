import express, { type Application, type Request, type Response } from "express"

const app: Application= express();
const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log("Server is running on PORT 3000")
})