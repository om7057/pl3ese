import express from 'express';
const app=express();

app.get('/',(req,res)=>{
    res.send('Welcome to the home page ');
});

app.get('/about',(req,res)=>{
    res.send('This is the about page ');
});

app.get('/contact',(req,res)=>{
    res.send('Contact us at : email@example.com');
});


app.use((req, res)=>{
    res.status(404).send('Page not found');
})

const PORT=3000;

app.listen(PORT,(req,res)=>{
    console.log(`Server is running on the port :${PORT}`);
});

