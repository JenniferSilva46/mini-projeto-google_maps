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
        marcador = marcador.getPosition()

    })
}

// function exibe() {
//     map = new google.maps.Map(document.getElementById("map"), {
//         center: markerPosition,
//         zoom: 14,
//     });

//     marcador.forEach(function (valor, indice) {
//         const lala = new google.maps.Marker({
//             map: map,
//             position: valor.position
//         })
//     })

// }

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
    console.log(obj);
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