// const mongoose =require('mongoose')
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cookieParser =require("cookie-parser");


app.use(cookieParser());


dotenv.config({ path: './config.env'});

require('./db/conn');

app.use(express.json());

// const User = require('./model/userSchema')

app.use(require('./router/auth'));

const PORT = process.env.PORT


//Middleware

// const middleware = (req,res,next) => {
//     console.log('this is my middleware');
//     next();
// }

// app.get('/',(req,res) => {
//     res.send('Hello server')
// });
// app.get('/about', middleware,(req,res) => {
//     res.send('Hello About server')
// });
// app.get('/contact',(req,res) => {
//     res.send('Hello contact server')
// });
app.get('/signin',(req,res) => {
    res.send('Hello signin server')
});
app.get('/signup',(req,res) => {
    res.send('Hello signup server')
});
app.get('/Basic',(req,res) => {
    res.send('Hello Basic server')
});

app.listen(PORT, () => {
    console.log(`server ${PORT} is running `);
})