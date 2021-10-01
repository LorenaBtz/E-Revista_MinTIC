let menu = document.getElementsByClassName("menu-login")[0]
let login = document.getElementById("login");
let contadorMenu = 1;

menu.addEventListener("click", function () {
    login.classList.toggle('menudos');
    contadorMenu++;
})

login.addEventListener('click', function (e) {
    login.classList.toggle('menudos');
});