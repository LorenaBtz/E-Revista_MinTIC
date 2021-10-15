using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Revista.Models;
using Microsoft.AspNetCore.Cors;
using System.Text.Json;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Revista.Controllers
{
   [Route("api/[controller]")]
   [ApiController]
   [EnableCors("CorsPolicy")]//libreria cors
   public class MensajeController : ControllerBase
   {
      // GET: api/<MensajeController>
      [HttpGet]
      public IEnumerable<string> Get()
      {
         return new string[] { "value1", "value2" };
      }

      // GET api/<MensajeController>/5
      [HttpGet("{id}")]
      public string Get(int id)
      {
         return "value";
      }


      // GET: api/<MensajeController>/6
      [HttpGet("{ced}/{offset}")]
      public String Get(String ced, int offset)
      {

         ClsMensaje mensaje1 = new ClsMensaje(0, "", ced, "", "");

         mensaje1.conectar();
         String mensaje = mensaje1.listarMensajes(offset);
         return mensaje;
      }

      // POST api/<MensajeController>
      [HttpPost]
      public String Post([FromBody] JsonElement datosI)
      {
         //int id_men = datosI.GetProperty("id_men").GetInt32();
         String fecha = datosI.GetProperty("fecha").ToString();
         String cedula = datosI.GetProperty("ced").ToString();
         String asunto = datosI.GetProperty("asunto").ToString();
         String mens = datosI.GetProperty("mensaje").ToString();


         //Se crea objeto de la clase ClsArticulo
         ClsMensaje mensaje1 = new ClsMensaje(0, fecha, cedula, asunto, mens);

         mensaje1.conectar();
         String mensaje = mensaje1.ingresarMensaje();
         return mensaje;
      }

      // PUT api/<MensajeController>/5
      [HttpPut("{id}")]
      public void Put(int id, [FromBody] string value)
      {
      }

      // DELETE api/<MensajeController>/5
      [HttpDelete]
      public String Delete([FromBody] JsonElement datosI)
      {
         int id_men = datosI.GetProperty("id_men").GetInt32();

         ClsMensaje mensaje1 = new ClsMensaje(id_men, "", "", "", "");

         mensaje1.conectar();

         String mensaje = mensaje1.eliminarMensaje();
         return mensaje;
      }
   }
}
