require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const authMiddleware = require('./middleware/authMiddleware');
const authRouter = require('./routers/authRouter');
const adminRouter = require('./routers/adminRouter');
const notesRouter = require('./routers/notesRouter');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ["http://localhost:8080", "http://192.168.0.187:8080", "http://192.168.1.153:8080"] }));

//app.use(function(req, res, next) {
  //  res.header('Access-Control-Allow-Origin', "http://localhost:8080");
    //res.header('Access-Control-Allow-Credentials', true);
    //res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    //next();
  //});

//{ credentials: true, origin: "http://localhost:8080" }
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
