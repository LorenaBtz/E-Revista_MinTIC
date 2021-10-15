using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Revista.Models;
using System.Text.Json;
using Microsoft.AspNetCore.Cors;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Revista.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("CorsPolicy")]//libreria cors
    public class UsuarioController : ControllerBase
    {
        // GET: api/<UsuarioController>
        [HttpGet("{offset}")]
        public String Get(int offset)
        {
            ClsUsuario autor = new ClsUsuario("", "", "", "", "", "", "", 1);

            autor.conectar();
            String mensaje = autor.listarAutores(offset);
            return mensaje;
        }

        // GET api/<UsuarioController>/5
        [HttpGet("{ced}/{clave}")]
        public int Get(String ced, String clave)
        {
            ClsUsuario usuario = new ClsUsuario(ced, "", "", "", "", "", clave,0);

            usuario.conectar();
            int mensaje = usuario.autenticar();
            return mensaje;
        }

        // POST api/<UsuarioController>
        [HttpPost]
        public String Post([FromBody] JsonElement datosI)
        {
            String cedula = datosI.GetProperty("ced").ToString();
            String nombre1 = datosI.GetProperty("nom1").ToString();
            String nombre2 = datosI.GetProperty("nom2").ToString();
            String apellido1 = datosI.GetProperty("apell1").ToString();
            String apellido2 = datosI.GetProperty("apell2").ToString();
            String email = datosI.GetProperty("email").ToString();
            String clave = datosI.GetProperty("clave").ToString();
            int tipo = datosI.GetProperty("tipo").GetInt32();
            
            //Se crea objeto de la clase ClsUsuario
            ClsUsuario usuario = new ClsUsuario(cedula, nombre1, nombre2, apellido1, apellido2, email, clave, tipo);

            //Se conecta con la base de datos
            usuario.conectar();

            //Se guardan datos en la tabla usuario
            String mensaje = usuario.ingresarUsuario();
            return mensaje;
        }

        // PUT api/<UsuarioController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<UsuarioController>/5
        [HttpDelete]
        public String Delete([FromBody] JsonElement datosI)
        {
            String cedula = datosI.GetProperty("ced").ToString();

            ClsUsuario usuario = new ClsUsuario(cedula, "", "", "", "", "", "", 0);
            


            usuario.conectar();

            String mensaje = usuario.eliminarUsuario();
            return mensaje;
        }
    }
}
