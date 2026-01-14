const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const router = require('./router/index');
const connectDb = require('./lib/db');

dotenv.config();
connectDb();
app.use(cors());
app.use(express.json());

app.use('/api', router);
const PORT = process.env.PORT || 5000;

app.get('/', (req, res)=>{
    res.send('Hello World!');
    connectDb()
});

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});