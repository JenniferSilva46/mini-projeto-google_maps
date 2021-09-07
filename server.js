const express = require('express');
const cors = require('cors');


const app = express();
app.use(express.json());
app.use(cors());
const port = 8080;

const db = require('./database/database');

app.post('/pontos', db.addMarker);

app.listen(port, () => {
    console.log(`App running on port ${port}.`);
});