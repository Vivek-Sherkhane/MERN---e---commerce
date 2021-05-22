import express from "express";
import mongoose from 'mongoose';
import userRouter from "./routers/userRouter.js";
import productRouter from "./routers/productRouter.js";
import dotenv from "dotenv";
import orderRouter from "./routers/orderRouter.js";

dotenv.config();

const app = express();
app.use(express.urlencoded({extended : true}));
app.use(express.json());


mongoose.connect("mongodb://localhost/amazona",{
    useNewUrlParser : true,
    useUnifiedTopology : true,
    useCreateIndex : true
});

app.use('/api/users',userRouter);
app.use('/api/products',productRouter);
app.use('/api/order',orderRouter);


app.get('/', (req,res) =>{
    res.send("server started at port 5000");
});

app.use((err,req,res,next) =>{
    res.status(500).send({message : err.message});
})

app.listen(5000, (req,res)=>{
    console.log("server started at port 5000");
});

