let marcador;
let map;
let markerPosition = {
    lat: -6.581043172515283,
    lng: -38.598065561775655
};

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: markerPosition,
        zoom: 14,
    });
    map.addListener("click", event => {
        marcador = new google.maps.Marker({
            map: map,
            position: event.latLng
        })
        markerCoord(marcador.getPosition())

    })
}

function exibe() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: markerPosition,
        zoom: 14,
    });

    marcador.forEach(function (valor, indice) {
        const lala = new google.maps.Marker({
            map: map,
            position: valor.position
        })
    })

}

const {
    client
} = require('./database');

function markerCoord(coordenadas) {
    const nome = "maria";
    console.log(coordenadas.lat());
    client.query(`INSERT INTO marker (nome, coordenadas  ) VALUES ($1, ST_GeomFromText(POINT(${coordenadas.lat()} ${coordenadas.lng()})))`)
        .then(() => {
            console.log('sucesso');
            client.end(console.log('sucesso'));
        })
        .catch(err => console.log(err))
        .then(() => {
            console.log('erro');
            process.exit();
        })
}