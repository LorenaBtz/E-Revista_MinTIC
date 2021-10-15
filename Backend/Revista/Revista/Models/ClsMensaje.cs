using Newtonsoft.Json;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Threading.Tasks;

namespace Revista.Models
{
   public class ClsMensaje
   {
      int id_men { set; get; }
      String fecha { set; get; }
      String ced { set; get; }
      String asunto { set; get; }
      String mensaje { set; get; }

      NpgsqlConnection cone;

      public ClsMensaje(int id_men, string fecha, string ced, string asunto, string mensaje)
      {
         this.id_men = id_men;
         this.fecha = fecha;
         this.ced = ced;
         this.asunto = asunto;
         this.mensaje = mensaje;
      }
      public void conectar()
      {
         this.cone = new NpgsqlConnection("Server= 127.0.0.1; User Id=admin; Password=123; Database=RevistaDB ");
         this.cone.Open();
      }
      public String ingresarMensaje()
      {
         try
         {
            NpgsqlCommand cmd = new NpgsqlCommand();
            String sql = "INSERT INTO mensaje VALUES (DEFAULT,'" + this.fecha + "','" + this.ced + "','" + this.asunto + "','" + this.mensaje + "')";
            cmd = new NpgsqlCommand(sql, this.cone);
            cmd.ExecuteNonQuery();
            return "Mensaje ingresado satisfactoriamente";
         }
         catch (Exception)
         {
            return "Error, los datos no fueron guardados";
         }
      }
      public String listarMensajes(int offset)
      {
         String Mensaje = "";
         try
         {
            NpgsqlCommand cmd = new NpgsqlCommand();
            String sql = "";
            sql = "select * from mensaje where cedula='" + this.ced + "' LIMIT 3 OFFSET " + offset;
            var reader = new NpgsqlCommand(sql, this.cone).ExecuteReader();
            var todosLosMensajes = new List<dynamic>();

            while (reader.Read())
            {
               dynamic mensaje = new ExpandoObject();

               mensaje.id_men = reader.GetInt32(0);
               mensaje.fecha = reader.GetString(1);
               mensaje.ced = reader.GetString(2);
               mensaje.asunto = reader.GetString(3);
               mensaje.mensaje = reader.GetString(4);
               todosLosMensajes.Add(mensaje);

            }

            var Json = JsonConvert.SerializeObject(todosLosMensajes);
            return Json;
         }
         catch (Exception E)
         {
            Mensaje = "Error" + E;
         }
         return Mensaje;
      }
      public String eliminarMensaje()
      {
         try
         {
            NpgsqlCommand cmd = new NpgsqlCommand();
            String sql = "DELETE FROM mensaje WHERE id_mensaje = " + this.id_men;
            cmd = new NpgsqlCommand(sql, this.cone);
            cmd.ExecuteNonQuery();
            return "Mensaje eliminado satisfactoriamente";
         }
         catch (Exception)
         {
            return "Error, el mensaje no fue eliminado";
         }

      }
   }
}
