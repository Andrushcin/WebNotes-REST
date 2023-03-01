require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const authMiddleware = require('./middleware/authMiddleware');
const authRouter = require('./routers/authRouter');
const adminRouter = require('./routers/adminRouter');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use('/auth', authRouter);

app.use('/admin', cors(), authMiddleware(), adminRouter);

app.use('/media', express.static(path.join(__dirname, 'media')));

const start = async () => {
    try {
        app.listen(PORT, () => console.log(`Server has been started on port ${PORT}...`));
    } catch(e) {
        console.log(e)
    }
}

start();
