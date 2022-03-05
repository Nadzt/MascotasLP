function breedChange() {
    // // Get elements
    var animal = document.getElementById("animal");
    var raza = document.getElementById("breed");
    // // Reset options
    raza.options.length = 0;

    // // Set option array based on selected
    if (animal.value == "perro") {
        var options = {
            Cualquiera: "Todas",
            mestizo : 'Mestizo',
            caniche : 'Caniche',
            bulldog : 'Bulldog',
            labrador : 'Labrador',
            pastor : 'Pastor Aleman',
            boxer : 'Boxer',
            otra : 'Otra',
        };

    } else {
        
        if (animal.value == "gato") {
            var options = {
                Cualquiera: "Todas",
                peloLargo : 'Pelo Largo',
                peloCorto : 'Pelo Corto',
            };
        } else {
            var options = {
                Cualquiera: "Todas",
            };
        }
    }

    // // Set options in select
    for(index in options) {
        raza.options[raza.options.length] = new Option(options[index], index);
    }

}

document.getElementById("animal").addEventListener("click", breedChange);