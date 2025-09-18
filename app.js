const express = require('express');
const app = express();
require('dotenv').config();
const connect = require('./config/connect');
connect();

const user = require('./routes/userRoutes');
const message = require('./routes/messageRoutes');

app.use(express.json());

app.use('/api/user',user)
app.use('/api/message',message);

const port = process.env.PORT
app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})