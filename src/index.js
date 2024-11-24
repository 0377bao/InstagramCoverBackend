const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const routes = require('./routes');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
dotenv.config();

// Sử dụng middleware cors
app.use(cors());

app.use(
    cors({
        origin: '*',
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
    }),
);

// config duong dan mac dinh cho cac file tinh
app.use(express.static(path.join(__dirname, 'public')));
// parser json from client
app.use(express.json()); // Thay cho bodyParser.json()
app.use(express.urlencoded({ extended: true })); // Thay cho bodyParser.urlencoded

// Router init
routes(app);

// Connect to DB
mongoose
    .connect(process.env.MONGO_DB)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log(err);
    });

app.listen(port, () => {
    console.log('Server is running on port ' + port);
});
