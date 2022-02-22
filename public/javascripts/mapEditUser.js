// constantes
let map;
let markers = [];
let locationInput = document.getElementById("location");
let geometryInput = document.getElementById("geometry"); // a eliminar
let mapCenter = { lat: userLat, lng: userLng }

function initMap() {
    map = new google.maps.Map(document.getElementById("map-EditUser"), {
        center: mapCenter,
        zoom: 15,
        mapId: `e952df45373f5c93`,
        scrollwheel: true,
        disableDoubleClickZoom: true,
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false,
        gestureHandling: "greedy",
    });

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

    let centro = new google.maps.Marker({
        position: mapCenter,
        map,
        draggable: false,
        icon: {
            url: "/images/Man.png",
            scaledSize: new google.maps.Size(35, 35),
            origin: new google.maps.Point(0,0),
        },
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
    
