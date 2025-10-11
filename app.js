const express = require('express');
const app = express();
require('dotenv').config();
const cors =require("cors");
const connect = require('./config/connect');
connect();

const logger = require('./middleware/logger');
const user = require('./routes/userRoutes');
const message = require('./routes/messageRoutes');
const auth = require('./routes/auth');

app.use(logger)
app.use(express.json());
app.use(cors());
app.use('/api/user',user)
app.use('/api/message',message);
app.use('/api/auth',auth);

const port = process.env.PORT
app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})