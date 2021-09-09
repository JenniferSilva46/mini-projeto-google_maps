let marcador;
let map;
let markerPosition = {
    lat: -6.88634,
    lng: -38.5614
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
        marcador = marcador.getPosition()

    })

}

const button = document.querySelector('#button');

button.addEventListener("click", event => {

    const obj = {
        name: document.querySelector('#name').value,
        email: document.querySelector('#email').value,
        datetime: document.querySelector('#datetime').value,
        tel: document.querySelector('#tel').value,
        description: document.querySelector('#description').value,
        lat: marcador.lat(),
        lng: marcador.lng(),
    };
    salveDB(obj);
})

const salveDB = (obj) => {
    fetch("http://localhost:8080/pontos", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        }).then(res => {
            alert('Inserido!')
        })
        .catch(error => alert('Falha ao salvar!'));

}

const fetchData = () => {
    const url = 'http://localhost:8080/pontos/getData'
    fetch(url)
        .then(res => res.json())
        .then(data => {
            exibeData(data);
        })
}
const buttonGet = document.querySelector("#buttonGet");

function exibeData(obj) {
    const dataObj = obj;
    exibe(dataObj);
}

function exibe(dataObj) {

    map = new google.maps.Map(document.getElementById("map"), {
        center: markerPosition,
        zoom: 14,
    });
    dataObj.forEach(function (valor, indice) {

        const markerPoint = {
            lat: dataObj[indice].st_x,
            lng: dataObj[indice].st_y
        }

        new google.maps.Marker({
            map: map,
            position: markerPoint
        })
    })
}


buttonGet.addEventListener("click", fetchData);