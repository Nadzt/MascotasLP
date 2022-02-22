// constantes
let map;

function initMap() {

    // data es igual a los componentes del GeoJson petJson
    data = petJson.features;

    map = new google.maps.Map(document.getElementById("map-show"), {
        center: { lat: data.geometry.coordinates[1], lng: data.geometry.coordinates[0] },
        zoom: 16,
        mapId: `e952df45373f5c93`,
        scrollwheel: true,
        disableDoubleClickZoom: true,
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false,
        gestureHandling: "greedy",
    });


    // crea el marcador
    let marker = new google.maps.Marker({
        position: { lat: data.geometry.coordinates[1], lng: data.geometry.coordinates[0] },
        map,
        draggable: false,
    });
    
};
    
