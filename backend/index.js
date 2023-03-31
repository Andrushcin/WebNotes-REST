require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const authMiddleware = require('./middleware/authMiddleware');
const authRouter = require('./routers/authRouter');
const adminRouter = require('./routers/adminRouter');
const notesRouter = require('./routers/notesRouter');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({ origin: ["http://localhost:8080", "http://192.168.0.187:8080", "http://192.168.1.153:8080"] }));

app.use('/auth', authRouter);

app.use('/notes', authMiddleware(), notesRouter);

app.use('/media', express.static(path.join(__dirname, 'media')));

const start = async () => {
    try {
        app.listen(PORT, () => console.log(`Server has been started on port ${PORT}...`));
    } catch(e) {
        console.log(e)
    }
}

start();
