import express from "express";
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import UserRoutes from "./routes/user_routes";
dotenv.config()


const app:any=express();
const port:number|string=process.env.PORT||3000
console.log(process.env.PORT);
// console.log(UserRoutes.router);

app.use(bodyParser.json())
app.use('/', UserRoutes.router);


 
app.listen(port,()=>{
    console.log(`server running on port ${port}`)
    
})
