const submit = document.getElementById("submitNewPetForm")


function ReplaceFormClass() { 
    let form = document.getElementById("loadingForm");
    let loading = document.getElementById("loader");
    setTimeout( function(){ 
        if( form.classList.contains("isValidForSubmit") ) {
            loading.classList.remove("hidden");
        }
    }, 10);
};


submit.addEventListener("click", ReplaceFormClass)