import express from 'express';

const app=express();

app.get('/',(req,res)=>{
    res.send("This is the home page");
})

app.get('/users/:id',(req,res)=>{
    const userId=req.params.id;
    res.send(`User Id : ${userId}`);
})

app.get('/products/:category/:productId',(req,res)=>{
    const {category,productId}= req.params;
    res.json({
        category,
        productId
    });
});

app.use((req,res)=>{
    res.status(404).send("404 Not Found");
});

const PORT=3000;

app.listen(PORT,(req,res)=>{
    console.log(`Server is Running on port: ${PORT}`)
});

