var offset = 0;

function SolicitarPeticion() {
  var request = new Request("https://localhost:44337/api/Values", {
    method: "Get",
  });

  fetch(request)
    .then(function (response) {
      return response.text();
    })
    .then(function (data) {
      console.log("data = ", data);
    })
    .catch(function (err) {
      console.error(err);
    });
}

function IniciarSesion() {
  var ced = document.getElementById("ced").value;
  var clave = document.getElementById("clave").value;

  var request = new Request(
    "https://localhost:44395/api/Usuario/" + ced + "/" + clave,
    {
      method: "Get",
    }
  );

  fetch(request)
    .then(function (response) {
      return response.text();
    })
    .then(function (data) {
      console.log("data = ", data);
      if (data == "1") {
        localStorage.setItem("ced", ced);
        alert("Ir a pagina de Autor");
        window.open("index_autor.html");
      } else if (data == "2") {
        localStorage.setItem("ced", ced);
        alert("Ir a pagina de Editor");
        window.open("index_editor.html");
      }
    })
    .catch(function (err) {
      console.error(err);
    });
}

function actualizar_offset_1(direccion) {
  if (direccion == 1) {
    offset += 3;
  } else if (offset > 0) {
    offset -= 3;
  }
  ListarAutores();
}

function limpiar_1() {
  document.getElementById("lista_autores").innerHTML = "";
}

function ListarAutores() {
  limpiar_1();

  var request = new Request("https://localhost:44395/api/Usuario/" + offset, {
    method: "Get",
  });

  fetch(request)
    .then(function (response) {
      return response.text();
    })
    .then(function (data) {
      console.log("data = ", data);
      json = JSON.parse(data);
      var lista = document.getElementById("lista_autores");
      var texto = document.createTextNode("Cedula");
      var small_div = document.createElement("div");

      small_div.setAttribute("class", "ListarHeader");
      small_div.appendChild(texto);
      lista.appendChild(small_div);

      var texto = document.createTextNode("Nombre 1");
      var small_div = document.createElement("div");
      small_div.setAttribute("class", "ListarHeader");
      small_div.appendChild(texto);
      lista.appendChild(small_div);

      var texto = document.createTextNode("Nombre 2");
      var small_div = document.createElement("div");
      small_div.setAttribute("class", "ListarHeader");
      small_div.appendChild(texto);
      lista.appendChild(small_div);

      var texto = document.createTextNode("Apellido 1");
      var small_div = document.createElement("div");
      small_div.setAttribute("class", "ListarHeader");
      small_div.appendChild(texto);
      lista.appendChild(small_div);

      var texto = document.createTextNode("Apellido 2");
      var small_div = document.createElement("div");
      small_div.setAttribute("class", "ListarHeader");
      small_div.appendChild(texto);
      lista.appendChild(small_div);

      var texto = document.createTextNode("E-mail");
      var small_div = document.createElement("div");
      small_div.setAttribute("class", "ListarHeader");
      small_div.appendChild(texto);
      lista.appendChild(small_div);

      for (var articulos in json) {
        var lista = document.getElementById("lista_autores");

        //var texto = document.createTextNode(json[articulos].id_art);
        var small_input = document.createElement("input");
        small_input.setAttribute("class", "AnchoInput");
        small_input.setAttribute("type", "text");
        small_input.setAttribute("value", json[articulos].ced);
        var small_div = document.createElement("div");
        small_div.setAttribute("class", "ListarSection");
        small_div.appendChild(small_input);
        lista.appendChild(small_div);

        var small_input = document.createElement("textarea");
        small_input.setAttribute("class", "AnchoInput");
        small_input.setAttribute("type", "text");
        small_input.setAttribute("cols", 10);
        small_input.setAttribute("rows", 10);
        small_input.value = json[articulos].nom1;
        var small_div = document.createElement("div");
        small_div.setAttribute("class", "ListarSection");
        small_div.appendChild(small_input);
        lista.appendChild(small_div);

        var small_input = document.createElement("textarea");
        small_input.setAttribute("class", "AnchoInput");
        small_input.setAttribute("type", "text");
        small_input.setAttribute("cols", 10);
        small_input.setAttribute("rows", 10);
        small_input.value = json[articulos].nom2;
        var small_div = document.createElement("div");
        small_div.setAttribute("class", "ListarSection");
        small_div.appendChild(small_input);
        lista.appendChild(small_div);

        var small_input = document.createElement("textarea");
        small_input.setAttribute("class", "AnchoInput");
        small_input.setAttribute("type", "text");
        small_input.setAttribute("cols", 10);
        small_input.setAttribute("rows", 10);
        small_input.value = json[articulos].apell1;
        var small_div = document.createElement("div");
        small_div.setAttribute("class", "ListarSection");
        small_div.appendChild(small_input);
        lista.appendChild(small_div);

        var small_input = document.createElement("textarea");
        small_input.setAttribute("class", "AnchoInput");
        small_input.setAttribute("type", "text");
        small_input.setAttribute("cols", 10);
        small_input.setAttribute("rows", 10);
        small_input.value = json[articulos].apell2;
        var small_div = document.createElement("div");
        small_div.setAttribute("class", "ListarSection");
        small_div.appendChild(small_input);
        lista.appendChild(small_div);

        var small_input = document.createElement("input");
        small_input.setAttribute("class", "AnchoInput");
        small_input.setAttribute("type", "text");
        small_input.setAttribute("value", json[articulos].email);
        var small_div = document.createElement("div");
        small_div.setAttribute("class", "ListarSection");
        small_div.appendChild(small_input);
        lista.appendChild(small_div);
      }
    })
    .catch(function (err) {
      console.error(err);
    });
}

function actualizar_offset_4(direccion) {
  if (direccion == 1) {
    offset += 3;
  } else if (offset > 0) {
    offset -= 3;
  }
  ListarArticulosAprobados();
}

function limpiar_4() {
  document.getElementById("listar_datos_aprob").innerHTML = "";
}

function ListarArticulosAprobados() {
  limpiar_4();
  ced = localStorage.getItem("ced");
  var request = new Request(
    "https://localhost:44395/api/Articulo/" +
      ced +
      "/" +
      ced +
      "/" +
      ced +
      "/" +
      offset,
    {
      method: "Get",
    }
  );

  fetch(request)
    .then(function (response) {
      return response.text();
    })
    .then(function (data) {
      console.log("data = ", data);
      json = JSON.parse(data);
      var lista = document.getElementById("listar_datos_aprob");

      var texto = document.createTextNode("Id Artículo");
      var small_div = document.createElement("div");
      small_div.setAttribute("class", "ListarHeader");
      small_div.appendChild(texto);
      lista.appendChild(small_div);

      var texto = document.createTextNode("Cédula");
      var small_div = document.createElement("div");
      small_div.setAttribute("class", "ListarHeader");
      small_div.appendChild(texto);
      lista.appendChild(small_div);

      var texto = document.createTextNode("Titulo");
      var small_div = document.createElement("div");
      small_div.setAttribute("class", "ListarHeader");
      small_div.appendChild(texto);
      lista.appendChild(small_div);

      var texto = document.createTextNode("Descripcion");
      var small_div = document.createElement("div");
      small_div.setAttribute("class", "ListarHeader");
      small_div.appendChild(texto);
      lista.appendChild(small_div);

      var texto = document.createTextNode("Contenido");
      var small_div = document.createElement("div");
      small_div.setAttribute("class", "ListarHeader");
      small_div.appendChild(texto);
      lista.appendChild(small_div);

      var texto = document.createTextNode("Estado Publicación");
      var small_div = document.createElement("div");
      small_div.setAttribute("class", "ListarHeader");
      small_div.appendChild(texto);
      lista.appendChild(small_div);

      for (var articulos in json) {
        var lista = document.getElementById("listar_datos_aprob");

        //var texto = document.createTextNode(json[articulos].id_art);
        var small_input = document.createElement("input");
        small_input.setAttribute("class", "AnchoInput");
        small_input.setAttribute("type", "text");
        small_input.setAttribute("value", json[articulos].id_art);
        var small_div = document.createElement("div");
        small_div.setAttribute("class", "ListarSection");
        small_div.appendChild(small_input);
        lista.appendChild(small_div);

        var small_input = document.createElement("textarea");
        small_input.setAttribute("class", "AnchoInput");
        small_input.setAttribute("type", "text");
        small_input.setAttribute("cols", 10);
        small_input.setAttribute("rows", 10);
        small_input.value = json[articulos].ced;
        var small_div = document.createElement("div");
        small_div.setAttribute("class", "ListarSection");
        small_div.appendChild(small_input);
        lista.appendChild(small_div);

        var small_input = document.createElement("textarea");
        small_input.setAttribute("class", "AnchoInput");
        small_input.setAttribute("type", "text");
        small_input.setAttribute("cols", 10);
        small_input.setAttribute("rows", 10);
        small_input.value = json[articulos].titulo;
        var small_div = document.createElement("div");
        small_div.setAttribute("class", "ListarSection");
        small_div.appendChild(small_input);
        lista.appendChild(small_div);

        var small_input = document.createElement("textarea");
        small_input.setAttribute("class", "AnchoInput");
        small_input.setAttribute("type", "text");
        small_input.setAttribute("cols", 10);
        small_input.setAttribute("rows", 10);
        small_input.value = json[articulos].desc;
        var small_div = document.createElement("div");
        small_div.setAttribute("class", "ListarSection");
        small_div.appendChild(small_input);
        lista.appendChild(small_div);

        var small_input = document.createElement("textarea");
        small_input.setAttribute("class", "AnchoInput");
        small_input.setAttribute("type", "text");
        small_input.setAttribute("cols", 10);
        small_input.setAttribute("rows", 10);
        small_input.value = json[articulos].cont;
        var small_div = document.createElement("div");
        small_div.setAttribute("class", "ListarSection");
        small_div.appendChild(small_input);
        lista.appendChild(small_div);

        var small_input = document.createElement("textarea");
        small_input.setAttribute("class", "AnchoInput");
        small_input.setAttribute("type", "text");
        small_input.setAttribute("cols", 10);
        small_input.setAttribute("rows", 10);
        small_input.value = json[articulos].estado;
        var small_div = document.createElement("div");
        small_div.setAttribute("class", "ListarSection");
        small_div.appendChild(small_input);
        lista.appendChild(small_div);
      }
    })
    .catch(function (err) {
      console.error(err);
    });
}

function actualizar_offset_2(direccion) {
  if (direccion == 1) {
    offset += 3;
  } else if (offset > 0) {
    offset -= 3;
  }
  ListarArticulosParaPublicar();
}

function limpiar_2() {
  document.getElementById("lista_articulos").innerHTML = "";
}

function ListarArticulosParaPublicar() {
  limpiar_2();

  var request = new Request("https://localhost:44395/api/Articulo/" + offset, {
    method: "Get",
  });

  fetch(request)
    .then(function (response) {
      return response.text();
    })
    .then(function (data) {
      console.log("data = ", data);
      json = JSON.parse(data);
      var lista = document.getElementById("lista_articulos");

      var texto = document.createTextNode("Id Artículo");
      var small_div = document.createElement("div");
      small_div.setAttribute("class", "ListarHeader");
      small_div.appendChild(texto);
      lista.appendChild(small_div);

      var texto = document.createTextNode("Cédula");
      var small_div = document.createElement("div");
      small_div.setAttribute("class", "ListarHeader");
      small_div.appendChild(texto);
      lista.appendChild(small_div);

      var texto = document.createTextNode("Titulo");
      var small_div = document.createElement("div");
      small_div.setAttribute("class", "ListarHeader");
      small_div.appendChild(texto);
      lista.appendChild(small_div);

      var texto = document.createTextNode("Descripcion");
      var small_div = document.createElement("div");
      small_div.setAttribute("class", "ListarHeader");
      small_div.appendChild(texto);
      lista.appendChild(small_div);

      var texto = document.createTextNode("Contenido");
      var small_div = document.createElement("div");
      small_div.setAttribute("class", "ListarHeader");
      small_div.appendChild(texto);
      lista.appendChild(small_div);

      var texto = document.createTextNode("Estado Publicación");
      var small_div = document.createElement("div");
      small_div.setAttribute("class", "ListarHeader");
      small_div.appendChild(texto);
      lista.appendChild(small_div);

      for (var articulos in json) {
        var lista = document.getElementById("lista_articulos");

        //var texto = document.createTextNode(json[articulos].id_art);
        var small_input = document.createElement("input");
        small_input.setAttribute("class", "AnchoInput");
        small_input.setAttribute("type", "text");
        small_input.setAttribute("value", json[articulos].id_art);
        var small_div = document.createElement("div");
        small_div.setAttribute("class", "ListarSection");
        small_div.appendChild(small_input);
        lista.appendChild(small_div);

        var small_input = document.createElement("textarea");
        small_input.setAttribute("class", "AnchoInput");
        small_input.setAttribute("type", "text");
        small_input.setAttribute("cols", 10);
        small_input.setAttribute("rows", 10);
        small_input.value = json[articulos].ced;
        var small_div = document.createElement("div");
        small_div.setAttribute("class", "ListarSection");
        small_div.appendChild(small_input);
        lista.appendChild(small_div);

        var small_input = document.createElement("textarea");
        small_input.setAttribute("class", "AnchoInput");
        small_input.setAttribute("type", "text");
        small_input.setAttribute("cols", 10);
        small_input.setAttribute("rows", 10);
        small_input.value = json[articulos].titulo;
        var small_div = document.createElement("div");
        small_div.setAttribute("class", "ListarSection");
        small_div.appendChild(small_input);
        lista.appendChild(small_div);

        var small_input = document.createElement("textarea");
        small_input.setAttribute("class", "AnchoInput");
        small_input.setAttribute("type", "text");
        small_input.setAttribute("cols", 10);
        small_input.setAttribute("rows", 10);
        small_input.value = json[articulos].desc;
        var small_div = document.createElement("div");
        small_div.setAttribute("class", "ListarSection");
        small_div.appendChild(small_input);
        lista.appendChild(small_div);

        var small_input = document.createElement("textarea");
        small_input.setAttribute("class", "AnchoInput");
        small_input.setAttribute("type", "text");
        small_input.setAttribute("cols", 10);
        small_input.setAttribute("rows", 10);
        small_input.value = json[articulos].cont;
        var small_div = document.createElement("div");
        small_div.setAttribute("class", "ListarSection");
        small_div.appendChild(small_input);
        lista.appendChild(small_div);

        var small_select = document.createElement("select");
        var option = document.createElement("option");
        option.text = json[articulos].estado;
        option.value = json[articulos].estado;

        small_select.appendChild(option);
        option = document.createElement("option");
        option.text = true;
        option.value = true;
        small_select.appendChild(option);
        option = document.createElement("option");
        option.text = false;
        option.value = false;
        small_select.appendChild(option);
        small_select.setAttribute("class", "AnchoInput");
        var small_div = document.createElement("div");
        small_div.setAttribute("class", "ListarSection");
        small_div.appendChild(small_select);
        lista.appendChild(small_div);

        small_select.setAttribute("id", "id" + json[articulos].id_art);
        small_select.setAttribute(
          "onchange",
          "ActualizarData(" + json[articulos].id_art + ")"
        );
      }
    })
    .catch(function (err) {
      console.error(err);
    });
}

function ActualizarData(id_art) {
  var request = new Request("https://localhost:44395/api/Articulo/" + id_art, {
    method: "Put",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      estado: Boolean(document.getElementById("id" + id_art).value),
    }),
  });

  fetch(request)
    .then(function (response) {
      return response.text();
    })
    .then(function (data) {
      alert(data);
    })
    .catch(function (err) {
      console.error(err);
    });
}
function IngresarArticulo() {
  var request = new Request("https://localhost:44395/api/Articulo", {
    method: "Post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ced: localStorage.getItem("ced"),
      titulo: document.getElementById("title").value,
      descripcion: document.getElementById("desc").value,
      contenido: document.getElementById("cont").value,
      fecha:
        new Date().getFullYear() +
        "-" +
        parseInt(new Date().getMonth() + 1) +
        "-" +
        new Date().getDate(),
    }),
  });

  fetch(request)
    .then(function (response) {
      return response.text();
    })
    .then(function (data) {
      alert(data);
    })
    .catch(function (err) {
      console.error(err);
    });
}

function IngresarMensaje() {
  var request = new Request("https://localhost:44395/api/Mensaje", {
    method: "Post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ced: document.getElementById("ced").value,
      asunto: document.getElementById("asun").value,
      mensaje: document.getElementById("men").value,
      fecha:
        new Date().getFullYear() +
        "-" +
        parseInt(new Date().getMonth() + 1) +
        "-" +
        new Date().getDate(),
    }),
  });

  fetch(request)
    .then(function (response) {
      return response.text();
    })
    .then(function (data) {
      alert(data);
    })
    .catch(function (err) {
      console.error(err);
    });
}

function actualizar_offset_3(direccion) {
  if (direccion == 1) {
    offset += 3;
  } else if (offset > 0) {
    offset -= 3;
  }
  ListarMensajes();
}

function limpiar_3() {
  document.getElementById("lista_mensajes").innerHTML = "";
}

function ListarMensajes() {
  limpiar_3();
  var ced = localStorage.getItem("ced");
  var request = new Request(
    "https://localhost:44395/api/Mensaje/" + ced + "/" + offset,
    {
      method: "Get",
    }
  );

  fetch(request)
    .then(function (response) {
      return response.text();
    })
    .then(function (data) {
      console.log("data = ", data);
      json = JSON.parse(data);
      var lista = document.getElementById("lista_mensajes");

      var texto = document.createTextNode("Id mensaje");
      var small_div = document.createElement("div");
      small_div.setAttribute("class", "ListarHeader2");
      small_div.appendChild(texto);
      lista.appendChild(small_div);

      var texto = document.createTextNode("Cedula");
      var small_div = document.createElement("div");
      small_div.setAttribute("class", "ListarHeader2");
      small_div.appendChild(texto);
      lista.appendChild(small_div);

      var texto = document.createTextNode("Fecha");
      var small_div = document.createElement("div");
      small_div.setAttribute("class", "ListarHeader2");
      small_div.appendChild(texto);
      lista.appendChild(small_div);

      var texto = document.createTextNode("Asunto");
      var small_div = document.createElement("div");
      small_div.setAttribute("class", "ListarHeader2");
      small_div.appendChild(texto);
      lista.appendChild(small_div);

      var texto = document.createTextNode("Mensaje");
      var small_div = document.createElement("div");
      small_div.setAttribute("class", "ListarHeader2");
      small_div.appendChild(texto);
      lista.appendChild(small_div);

      for (var articulos in json) {
        var lista = document.getElementById("lista_mensajes");

        //var texto = document.createTextNode(json[articulos].id_art);
        var small_input = document.createElement("input");
        small_input.setAttribute("class", "AnchoInput");
        small_input.setAttribute("type", "text");
        small_input.setAttribute("value", json[articulos].id_men);
        var small_div = document.createElement("div");
        small_div.setAttribute("class", "ListarSection2");
        small_div.appendChild(small_input);
        lista.appendChild(small_div);

        var small_input = document.createElement("input");
        small_input.setAttribute("class", "AnchoInput");
        small_input.setAttribute("type", "text");
        small_input.setAttribute("value", json[articulos].ced);
        var small_div = document.createElement("div");
        small_div.setAttribute("class", "ListarSection2");
        small_div.appendChild(small_input);
        lista.appendChild(small_div);

        var small_input = document.createElement("textarea");
        small_input.setAttribute("class", "AnchoInput");
        small_input.setAttribute("type", "text");
        small_input.setAttribute("cols", 10);
        small_input.setAttribute("rows", 10);
        small_input.value = json[articulos].fecha;
        var small_div = document.createElement("div");
        small_div.setAttribute("class", "ListarSection2");
        small_div.appendChild(small_input);
        lista.appendChild(small_div);

        var small_input = document.createElement("textarea");
        small_input.setAttribute("class", "AnchoInput");
        small_input.setAttribute("type", "text");
        small_input.setAttribute("cols", 10);
        small_input.setAttribute("rows", 10);
        small_input.value = json[articulos].asunto;
        var small_div = document.createElement("div");
        small_div.setAttribute("class", "ListarSection2");
        small_div.appendChild(small_input);
        lista.appendChild(small_div);

        var small_input = document.createElement("textarea");
        small_input.setAttribute("class", "AnchoInput");
        small_input.setAttribute("type", "text");
        small_input.setAttribute("cols", 10);
        small_input.setAttribute("rows", 10);
        small_input.value = json[articulos].mensaje;
        var small_div = document.createElement("div");
        small_div.setAttribute("class", "ListarSection2");
        small_div.appendChild(small_input);
        lista.appendChild(small_div);
      }
    })
    .catch(function (err) {
      console.error(err);
    });
}

function actualizar_offset(direccion) {
  if (direccion == 1) {
    offset += 3;
  } else if (offset > 0) {
    offset -= 3;
  }
  ListarArticulos();
}

function limpiar() {
  document.getElementById("lista_datos").innerHTML = "";
}

function ListarArticulos() {
  limpiar();
  var ced = localStorage.getItem("ced");
  var request = new Request(
    "https://localhost:44395/api/Articulo/" + ced + "/" + offset,
    {
      method: "Get",
    }
  );

  fetch(request)
    .then(function (response) {
      return response.text();
    })
    .then(function (data) {
      console.log("data = ", data);
      json = JSON.parse(data);
      var lista = document.getElementById("lista_datos");
      var texto = document.createTextNode("Id artículo");
      var small_div = document.createElement("div");

      small_div.setAttribute("class", "ListarHeader");
      small_div.appendChild(texto);
      lista.appendChild(small_div);

      var texto = document.createTextNode("Título");
      var small_div = document.createElement("div");
      small_div.setAttribute("class", "ListarHeader");
      small_div.appendChild(texto);
      lista.appendChild(small_div);

      var texto = document.createTextNode("Descripción");
      var small_div = document.createElement("div");
      small_div.setAttribute("class", "ListarHeader");
      small_div.appendChild(texto);
      lista.appendChild(small_div);

      var texto = document.createTextNode("Contenido");
      var small_div = document.createElement("div");
      small_div.setAttribute("class", "ListarHeader");
      small_div.appendChild(texto);
      lista.appendChild(small_div);

      var texto = document.createTextNode("Estado");
      var small_div = document.createElement("div");
      small_div.setAttribute("class", "ListarHeader");
      small_div.appendChild(texto);
      lista.appendChild(small_div);

      var texto = document.createTextNode("Fecha");
      var small_div = document.createElement("div");
      small_div.setAttribute("class", "ListarHeader");
      small_div.appendChild(texto);
      lista.appendChild(small_div);

      for (var articulos in json) {
        var lista = document.getElementById("lista_datos");

        //var texto = document.createTextNode(json[articulos].id_art);
        var small_input = document.createElement("input");
        small_input.setAttribute("class", "AnchoInput");
        small_input.setAttribute("type", "text");
        small_input.setAttribute("value", json[articulos].id_art);
        var small_div = document.createElement("div");
        small_div.setAttribute("class", "ListarSection");
        small_div.appendChild(small_input);
        lista.appendChild(small_div);

        var small_input = document.createElement("textarea");
        small_input.setAttribute("class", "AnchoInput");
        small_input.setAttribute("type", "text");
        small_input.setAttribute("cols", 10);
        small_input.setAttribute("rows", 10);
        small_input.value = json[articulos].titulo;
        var small_div = document.createElement("div");
        small_div.setAttribute("class", "ListarSection");
        small_div.appendChild(small_input);
        lista.appendChild(small_div);

        var small_input = document.createElement("textarea");
        small_input.setAttribute("class", "AnchoInput");
        small_input.setAttribute("type", "text");
        small_input.setAttribute("cols", 10);
        small_input.setAttribute("rows", 10);
        small_input.value = json[articulos].desc;
        var small_div = document.createElement("div");
        small_div.setAttribute("class", "ListarSection");
        small_div.appendChild(small_input);
        lista.appendChild(small_div);

        var small_input = document.createElement("textarea");
        small_input.setAttribute("class", "AnchoInput");
        small_input.setAttribute("type", "text");
        small_input.setAttribute("cols", 10);
        small_input.setAttribute("rows", 10);
        small_input.value = json[articulos].cont;
        var small_div = document.createElement("div");
        small_div.setAttribute("class", "ListarSection");
        small_div.appendChild(small_input);
        lista.appendChild(small_div);

        var small_input = document.createElement("input");
        small_input.setAttribute("class", "AnchoInput");
        small_input.setAttribute("type", "text");
        var state = "Aprobado";
        if (json[articulos].estado == false) {
          state = "No aprobado";
        }
        small_input.setAttribute("value", state);
        var small_div = document.createElement("div");
        small_div.setAttribute("class", "ListarSection");
        small_div.appendChild(small_input);
        lista.appendChild(small_div);

        var small_input = document.createElement("input");
        small_input.setAttribute("class", "AnchoInput");
        small_input.setAttribute("type", "text");
        small_input.setAttribute("value", json[articulos].cont);
        var small_div = document.createElement("div");
        small_div.setAttribute("class", "ListarSection");
        small_div.appendChild(small_input);
        lista.appendChild(small_div);
      }
    })
    .catch(function (err) {
      console.error(err);
    });
}

function ConsultarArticulo() {
  var ced = localStorage.getItem("ced");
  var id_articulo = document.getElementById("id_articulo").value;
  var title = document.getElementById("title").value;

  if (id_articulo == "") {
    id_articulo = parseInt(-1);
  } else if (title == "") {
    title = "vacio";
  }

  var request = new Request(
    "https://localhost:44395/api/Articulo/" +
      ced +
      "/" +
      id_articulo +
      "/" +
      title,
    {
      method: "Get",
    }
  );

  fetch(request)
    .then(function (response) {
      return response.text();
    })
    .then(function (data) {
      console.log("data = ", data);
      json = JSON.parse(data);
      document.getElementById("id_articulo1").value = json.id_articulo;
      document.getElementById("title1").value = json.titulo;
      document.getElementById("desc").value = json.descripcion;
      document.getElementById("cont").value = json.contenido;
    })
    .catch(function (err) {
      console.error(err);
    });
}

function ModificarArticulo() {
  var request = new Request("https://localhost:44395/api/Articulo", {
    method: "Put",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id_articulo: parseInt(document.getElementById("id_articulo1").value),
      ced: localStorage.getItem("ced"),
      titulo: document.getElementById("title1").value,
      descripcion: document.getElementById("desc").value,
      contenido: document.getElementById("cont").value,
    }),
  });

  fetch(request)
    .then(function (response) {
      return response.text();
    })
    .then(function (data) {
      alert(data);
    })
    .catch(function (err) {
      console.error(err);
    });
}

function EliminarArticulo() {
  ced = localStorage.getItem("ced");
  titulo = document.getElementById("title").value;
  var request = new Request(
    "https://localhost:44395/api/Articulo/" + ced + "/" + titulo + "/",
    {
      method: "Delete",
    }
  );

  fetch(request)
    .then(function (response) {
      return response.text();
    })
    .then(function (data) {
      alert(data);
    })
    .catch(function (err) {
      console.error(err);
    });
}

function IngresarUsuario() {
  var request = new Request("https://localhost:44395/api/Usuario", {
    method: "Post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ced: document.getElementById("ced").value,
      nom1: document.getElementById("nom1").value,
      nom2: document.getElementById("nom2").value,
      apell1: document.getElementById("apell1").value,
      apell2: document.getElementById("apell2").value,
      email: document.getElementById("correo").value,
      clave: document.getElementById("clave").value,
      tipo: parseInt(document.getElementById("tipo").value),
    }),
  });

  fetch(request)
    .then(function (response) {
      return response.text();
    })
    .then(function (data) {
      console.log("data = ", data);
      alert(data);
    })
    .catch(function (err) {
      console.error(err);
    });
}

function EliminarUsuario() {
  var request = new Request("https://localhost:44395/api/Usuario", {
    method: "Delete",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ced: document.getElementById("ced").value,
    }),
  });

  fetch(request)
    .then(function (response) {
      return response.text();
    })
    .then(function (data) {
      console.log("data = ", data);
      alert(data);
    })
    .catch(function (err) {
      console.error(err);
    });
}

function IrAtras() {
  window.history.back();
}
