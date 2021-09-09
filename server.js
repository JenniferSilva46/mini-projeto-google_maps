const express = require('express');
const cors = require('cors');


const app = express();
app.use(express.json());
app.use(cors());
const port = 8080;


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    app.use(cors());
    next();
});

const db = require('./database/database');

app.post('/pontos', db.addMarker);
app.get('/pontos/getData', db.getData);

app.listen(port, () => {
    console.log(`App running on port ${port}.`);
});