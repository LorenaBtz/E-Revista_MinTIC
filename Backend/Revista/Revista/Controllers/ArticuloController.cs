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
   public class ArticuloController : ControllerBase
   {

      [HttpGet("{offset}")]
      public String Get(int offset)
      {
         ClsArticulo articulo = new ClsArticulo(0, "", "", "", "", false, "");

         articulo.conectar();
         String mensaje = articulo.listarArticulosParaPublicar(offset);
         return mensaje;
      }

      // GET: api/<ArticuloController>
      [HttpGet("{ced}/{offset}")]
      public String Get(String ced, int offset)
      {
         ClsArticulo articulo = new ClsArticulo(0, ced, "", "", "", false, "");

         articulo.conectar();
         String mensaje = articulo.listarArticulos(offset);
         return mensaje;
      }



      // GET api/<ArticuloController>/5
      [HttpGet("{ced}/{id_articulo}/{title}")]
      public string Get(String ced, int id_articulo, String title)
      {
         //return "Los datos recibidos en el backend fueron: ced: "+ced+", id articulo: "+id_articulo+", titulo: "+title;

         ClsArticulo articulo = new ClsArticulo(id_articulo, ced, title, "", "", false, "");

         articulo.conectar();
         String mensaje = articulo.consultar();
         return mensaje;
      }

      // GET: api/<ArticuloController>
      //[HttpGet("{id}/{id2}/{ced}/{offset}")]
      [HttpGet("{id}/{id2}/{ced}/{offset}")]
      public String Get(String ced, int offset, int id, int id2)
      {
         ClsArticulo articulo = new ClsArticulo(0, ced, "", "", "", false, "");

         articulo.conectar();
         String mensaje = articulo.listarArticulosAprobados(offset);
         return mensaje;
      }

      // POST api/<ArticuloController>
      [HttpPost]
      public String Post([FromBody] JsonElement datosI)
      {
         //DateTime dateTime = DateTime.UtcNow.Date;
         //int id_art = datosI.GetProperty("id_art").GetInt32();
         String ced = datosI.GetProperty("ced").ToString();
         String titulo = datosI.GetProperty("titulo").ToString();
         String desc = datosI.GetProperty("descripcion").ToString();
         String cont = datosI.GetProperty("contenido").ToString();
         //Boolean estado = datosI.GetProperty("estado").GetBoolean();
         String fecha = datosI.GetProperty("fecha").ToString();

         //Se crea objeto de la clase ClsArticulo
         ClsArticulo articulo = new ClsArticulo(0, ced, titulo, desc, cont, false, fecha);

         articulo.conectar();
         String mensaje = articulo.ingresarArticulo();
         return mensaje;
      }

      // PUT api/<ArticuloController>/5
      [HttpPut]
      public String Put([FromBody] JsonElement datosI)
      {

         int id_art = datosI.GetProperty("id_articulo").GetInt32();
         String ced = datosI.GetProperty("ced").ToString();
         String titulo = datosI.GetProperty("titulo").ToString();
         String desc = datosI.GetProperty("descripcion").ToString();
         String cont = datosI.GetProperty("contenido").ToString();
         //Boolean estado = datosI.GetProperty("estado").GetBoolean();
         //String fecha = datosI.GetProperty("fecha").ToString();

         ClsArticulo articulo = new ClsArticulo(id_art, ced, titulo, desc, cont, false, "");

         articulo.conectar();
         String mensaje = articulo.modificarArticulo();
         return mensaje;
      }

      // PUT api/<ArticuloController>/5
      [HttpPut("{id_art}")]
      public String Put([FromBody] JsonElement datosI, int id_art)
      {

         //int id_art = datosI.GetProperty("id_articulo").GetInt32();
         //String ced = datosI.GetProperty("ced").ToString();
         //String titulo = datosI.GetProperty("titulo").ToString();
         //String desc = datosI.GetProperty("descripcion").ToString();
         //String cont = datosI.GetProperty("contenido").ToString();
         Boolean estado = datosI.GetProperty("estado").GetBoolean();
         //String fecha = datosI.GetProperty("fecha").ToString();

         //Se crea objeto de la clase ClsArticulo
         ClsArticulo articulo = new ClsArticulo(id_art, "", "", "", "", estado, "");

         articulo.conectar();
         String mensaje = articulo.modificarArticulo2();
         return mensaje;
      }

      // DELETE api/<ArticuloController>/5
      [HttpDelete("{ced}/{titulo}")]
      public String Delete(string ced, string titulo)
      {
         //int id_art = datosI.GetProperty("id_art").GetInt32();

         ClsArticulo articulo = new ClsArticulo(0, ced, titulo, "", "", false, "");

         articulo.conectar();

         String mensaje = articulo.eliminarArticulo();
         return mensaje;
      }
   }
}
