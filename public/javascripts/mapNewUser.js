// constantes
let map;
let markers = [];
let locationInput = document.getElementById("location");
let geometryInput = document.getElementById("geometry"); // a eliminar

function initMap() {
    map = new google.maps.Map(document.getElementById("map-NewUser"), {
        center: { lat: -34.921312, lng: -57.954424 },
        zoom: 14,
        mapId: `e952df45373f5c93`,
        scrollwheel: true,
        disableDoubleClickZoom: true,
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false,
        gestureHandling: "greedy",
    });
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                
                markers = [];
                let marker = new google.maps.Marker({
                    position: pos,
                    map,
                    draggable: false,
                });
                markers.push(marker);
                map.setCenter(pos);
                geometryInput.value = `{ "type": "Point", "coordinates": [ ${marker.position.lng()}, ${marker.position.lat()} ] }`;
                geocoder.geocode({ location: pos})
                .then((response) => {
                    locationInput.value = `${response.results[0].address_components[1].long_name} ${response.results[0].address_components[0].long_name}, ${response.results[0].address_components[3].long_name}`
                });
            },
        
        );
    } else {
        handleLocationError(false, infoWindow, map.getCenter());
    }  

    map.addListener("dblclick", (event) => {
        addMarker(event.latLng);
        geocoder.geocode({ location: event.latLng })
            .then((response) => {
                locationInput.value = `${response.results[0].address_components[1].long_name} ${response.results[0].address_components[0].long_name}, ${response.results[0].address_components[3].long_name}`
            });
    });


    // Define Geocoder
    const geocoder = new google.maps.Geocoder();
    document.getElementById("locationButton").addEventListener("click", () => {

        let address = locationInput.value || "plaza moreno, la plata";
        geocoder.geocode({
            address,
            componentRestrictions: {
            country: 'AR',
            },
        }).then((response) => {
            
            if (response.results[0]) {
                const location = response.results[0].geometry.location;
                map.setZoom(17);
                map.panTo(location);
                addMarker(location);
            } else {
                window.alert("No se encontraron resultados para esa direccion, verifique la direccion o ingrese una cercana");
            }

        }).catch((e) => { alert("No se encontraron resultados para esa direccion, verifique la direccion o ingrese una cercana") });
    });


    function addMarker(position) {
        for (let i = 0; i < markers.length; i++) {
            markers[i].setMap(null);
        };
        markers = [];
        let marker = new google.maps.Marker({
            position,
            map,
            draggable: false,
        });
        markers.push(marker);
        // console.log(marker);
        // geocoder.geocode({ location: marker.position }).then((response) => { console.log(response.results[0]) })
        geometryInput.value = `{ "type": "Point", "coordinates": [ ${marker.position.lng()}, ${marker.position.lat()} ] }`;
    };


};
    
