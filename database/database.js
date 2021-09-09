require('dotenv').config();
const {
    Client
} = require('pg');


const client = new Client({
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DATABASE,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD
});

client.connect()
    .then(() => console.log("Conectado com o postgres"))
    .catch(err => console.log(err.stack));

const addMarker = (request, response) => {
    const {
        name,
        email,
        datetime,
        tel,
        description,
        lat,
        lng,
    } = request.body;

    const query = `INSERT INTO users (name, email, date, contact, description, marker) VALUES ('${name}','${email}','${datetime}','${tel}','${description}', ST_GeomFromText('POINT(${lat} ${lng})'))`;

    client.query(query, (error, results) => {
        if (error) {
            response.status(400).send(error);
            console.log(error);
            return;
        }
        response.status(200).send('Inserido');
    });
};

const getData = (request, response) => {

    client.query('SELECT name, email, date, contact, description, ST_x(marker), ST_y(marker) FROM users',
        (err, results) => {

            if (err) {
                response.status(400).send(err);

            } else {
                response.status(200).json(results.rows);
            }

        });
}


module.exports = {
    addMarker,
    getData
}