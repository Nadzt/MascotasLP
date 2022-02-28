// NO SE USA

let commentsOnScreen = 5;
const totalComments = petJson.features.comments;

// esconde el boton de cargar comentarios cuando se publicaron todos los comentarios
const hideButton = () => {
    if(commentsOnScreen >= totalComments.length) {
        loadCommentsBtn.classList.add("hidden")
    };
};

// funcion del boton
loadCommentsBtn.addEventListener("click", function() {
    commentsOnScreen += 5;
    hideButton(commentsOnScreen);
    displayComments(totalComments.slice(commentsOnScreen, commentsOnScreen+5));
});


const displayComments = (comments) => {
    for(let comment of comments){

        let div1 = document.createElement("div");
        div1.classList.add("row");
        divComments.append(div1);
        let div2 = document.createElement("div");
        div2.classList.add("col-1");
        div1.append(div2);
        let img = document.createElement("img");
        img.src = comment.author.avatar;
        img.classList.add("avatar");
        div2.append(img);
        let div3 = document.createElement("div");
        div3.classList.add("col-10");
        div1.append(div3);
        let div4 = document.createElement("div");
        div4.classList.add("comment-bubble");
        div3.append(div4);
        let span = document.createElement("span");
        span.classList.add("username-comment", "d-block");
        span.innerText = `${comment.author.username}`;
        let span2 = document.createElement("span");
        span2.classList.add("bullet");
        span.append(span2);
        div4.append(span);
    }
}
