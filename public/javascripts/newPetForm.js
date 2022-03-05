function radio_click() {
    // Get elements
    var raza = document.getElementById("breed");
    var perro = document.getElementById("perro");
    // Reset options
    raza.options.length = 0;

    // Set option array based on selected
    if (perro.checked == true) {
        var options = {
            mestizo : 'Mestizo',
            caniche : 'Caniche',
            bulldog : 'Bulldog',
            labrador : 'Labrador',
            pastor : 'Pastor Aleman',
            boxer : 'Boxer',
            otra : 'Otra',
        };

    } else {
        var options = {
            peloLargo : 'Pelo Largo',
            peloCorto : 'Pelo Corto',
        };
    }

    // Set options in select
    for(index in options) {
        raza.options[raza.options.length] = new Option(options[index], index);
    }
}

document.getElementById("perro").addEventListener("click", radio_click);
document.getElementById("gato").addEventListener("click", radio_click);