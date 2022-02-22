// constantes
let map;
let markers = [];
let disabledAddress = document.getElementById("disabledAddress"); // a eliminar
let addressInput = document.getElementById("address");


if(userLat){ 
    mapCenter = { lat: userLat, lng: userLng }
} else {
    mapCenter = { lat: -34.921312, lng: -57.954424 }
}

function initMap() {
    map = new google.maps.Map(document.getElementById("map-index"), {
        center: mapCenter,
        zoom: 14,
        mapId: `e952df45373f5c93`,
        scrollwheel: true,
        disableDoubleClickZoom: true,
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false,
        gestureHandling: "greedy",
    });
  
    // data es igual a los componentes del GeoJson petJson
    data = petsJson.features;
    // Markers Configuracion de iconos
    const icons = {
        gato: {
            icon: { 
                url: "images/catMarker.png",
                scaledSize: new google.maps.Size(20, 20),
                origin: new google.maps.Point(0,0),
            },
        },
        perro: {
            icon: {
                url: "images/dogMarker.png",
                scaledSize: new google.maps.Size(20, 20),
                origin: new google.maps.Point(0,0),
            }
        },
        user: {
            icon: {
                url: "images/Man.png",
                scaledSize: new google.maps.Size(25, 25),
                origin: new google.maps.Point(0,0),
            }
        },
    };
    // infowindow declaracion
    const infoWindow = new google.maps.InfoWindow({
        content: "A"
    });
    // crea los marcadores de data y se ejecuta
    function addMarkers(data) {

        let centro = new google.maps.Marker({
            position: mapCenter,
            map,
            draggable: false,
            icon: icons.user.icon,
        });
        
        for (let i = 0; i < data.length; i++) {
            if(data[i].found != true){
                let marker = new google.maps.Marker({
                    position: { lat: data[i].geometry.coordinates[1], lng: data[i].geometry.coordinates[0] },
                    map,
                    draggable: false,
                    icon: icons[data[i].animal].icon,
                });
                
                marker.addListener("click", () => {
                    const infoWindowContent = 
                    `<h6 style="border-bottom: #eaeaea solid 1px; padding-bottom: 0.1rem">${data[i].location}</h6>` +
                    `<img src="${data[i].images[0].url}" style="width: 150px; height: 150px; border: 1px solid #ddd; border-radius: 4px; padding: 5px; object-fit: cover; ">` +
                    `<br>`+
                    `<div class="d-grid">` +
                    `<a href="/encontradas/${data[i]._id}" class="btn btn-sm btn-secondary" style="margin-top: .5rem">Ver Publicacion</a>` +
                    `</div>`;

                    infoWindow.setContent(infoWindowContent);
                    infoWindow.open({
                        anchor: marker,
                        map,
                        shouldFocus: true,
                    });
                });

                markers.push(marker)

            };

        };
   
    };

    addMarkers(data)

    // CLUSTERS
    const markerCluster = new markerClusterer.MarkerClusterer({ map, markers });
    // https://googlemaps.github.io/js-markerclusterer/classes/DefaultRenderer.html

};   
