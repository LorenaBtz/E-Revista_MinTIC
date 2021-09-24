let menu = document.getElementsByClassName(".menu_login")[0]
let formulario = document.getElementsByClassName(".formulario");
let contadorLogin =1;

menu.addEventListener("click", function(){
    formulario.classList.toggle("menudos");
    contadorLogin++;
})