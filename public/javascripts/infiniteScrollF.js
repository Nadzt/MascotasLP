const mascotasContainer = document.querySelector("#petsContainer");
var skip = 5;
// se cargan los primeros 10 en la pagina, skip es el intervalo en el que se muestran las mascotas
// 10- 15 - 20... -> se le suma +5 cada vez que se llegan a 100 pixeles del final

window.onscroll = async function (ev) {
    let scrollHeight = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
    );
    let currentScrollHeight = window.innerHeight + window.scrollY;

    if ((scrollHeight - currentScrollHeight) < 100) {
        skip = skip + 5;
        displayPets(petsJs.slice(skip, skip + 5));
    }
};

const displayPets = (Pets) => {
    for(let pet of Pets){

        let div1 = document.createElement("div");
        div1.classList.add("card", "mb-3", "pet-display");
        mascotasContainer.append(div1);
        let div2 = document.createElement("div");
        div2.classList.add("row");
        div1.append(div2);
        let div3 = document.createElement("div");
        div3.classList.add("col-12", "col-md-6", "col-xl-4", "petsImgDiv");
        div2.append(div3);
        let img = document.createElement("img");
        img.className = "img-card";
        img.src = pet.images[0].url.replace('/upload', '/upload/w_400,h_400,c_fill');
        div3.append(img);
        let div4 = document.createElement("div");
        div4.classList.add("col-12", "col-md-6", "col-xl-8", "petsBodyDiv");
        div2.append(div4);
        let div5 = document.createElement("div");
        div5.classList.add("card-body");
        div4.append(div5);

        let h4 = document.createElement("h4");
        h4.className = "card-title";
        h4.innerText = `${pet.animal} encontrado en ${pet.location}`;
        if(pet.found == true) { 
            let span = document.createElement("span");
            span.classList.add("foundSpan");
            span.innerText = "ya fue devuelto / encontro hogar!";
            h4.append(span);
        };
        div5.append(h4);
        let h6 = document.createElement("h6");
        h6.innerText = "Descripcion:";
        let p = document.createElement("p");
        p.className = "card-text";
        p.innerText = pet.description.slice(0, 800);
        div5.append(p);
        let div6 = document.createElement("div");
        div5.append(div6)
        let small = document.createElement("small")
        small.className = "text-secondary";
        const date = new Date(pet.date);
        let smallDescription = document.createElement("span");
        smallDescription.classList.add("smallTextDescriptions");
        smallDescription.innerText = ` - Raza ${pet.breed}, Sexo: ${pet.sex}, Edad: ${pet.age}`;
        small.innerText = `${date.toLocaleDateString()}`;
        small.append(smallDescription);
        div6.append(small);
        let a = document.createElement("a");
        a.href=`/encontradas/${pet.id}`;
        a.classList.add("btn", "btn-blue-color");
        a.innerText = "Ver Publicacion";
        div6.append(a);
    }
}
