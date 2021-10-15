using Newtonsoft.Json;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Threading.Tasks;

namespace Revista.Models
{
   public class ClsArticulo
   {
      int id_art { set; get; }
      String ced { set; get; }
      String titulo { set; get; }
      String desc { set; get; }
      String cont { set; get; }
      Boolean estado { set; get; }
      String fecha { set; get; }

      NpgsqlConnection cone; //Se agrega para variable tipo NpgsqlConnection

      public ClsArticulo(int id_art, string ced, string titulo, string desc, string cont, bool estado, string fecha)
      {
         this.id_art = id_art;
         this.ced = ced;
         this.titulo = titulo;
         this.desc = desc;
         this.cont = cont;
         this.estado = estado;
         this.fecha = fecha;
      }

      public void conectar()
      {
         this.cone = new NpgsqlConnection("Server= 127.0.0.1; User Id=admin; Password=123; Database=RevistaDB ");
         this.cone.Open();
      }
      public String ingresarArticulo()
      {
         try
         {
            NpgsqlCommand cmd = new NpgsqlCommand();
            String sql = "INSERT INTO articulo VALUES (DEFAULT,'" + this.ced + "','" + this.titulo + "','" + this.desc + "','" + this.cont + "'," + this.estado + ",'" + this.fecha + "')";
            cmd = new NpgsqlCommand(sql, this.cone);
            cmd.ExecuteNonQuery();
            return "Datos ingresados satisfactoriamente";
         }
         catch (Exception)
         {
            return "Error, los datos no fueron guardados";
         }

      }
      public String listarArticulos(int offset)
      {
         String Mensaje = "";
         try
         {
            NpgsqlCommand cmd = new NpgsqlCommand();
            String sql = "";
            sql = "select * from articulo where cedula='" + this.ced + "' LIMIT 3 OFFSET " + offset + ";";
            var reader = new NpgsqlCommand(sql, this.cone).ExecuteReader();
            var todosLosArticulos = new List<dynamic>();

            while (reader.Read())
            {
               dynamic articulo = new ExpandoObject();

               articulo.id_art = reader.GetInt32(0);
               //articulos.ced= reader.GetString(1);
               articulo.titulo = reader.GetString(2);
               articulo.desc = reader.GetString(3);
               articulo.cont = reader.GetString(4);
               articulo.estado = reader.GetBoolean(5);
               //articulo.fecha = reader.GetString(6);

               todosLosArticulos.Add(articulo);

            }

            var Json = JsonConvert.SerializeObject(todosLosArticulos);
            return Json;
         }
         catch (Exception E)
         {
            Mensaje = "Error" + E;
         }
         return Mensaje;
      }

      public String listarArticulosParaPublicar(int offset)
      {
         String Mensaje = "";
         try
         {
            NpgsqlCommand cmd = new NpgsqlCommand();
            String sql = "";
            sql = "select * from articulo order by id_articulo LIMIT 3 OFFSET " + offset + ";";
            var reader = new NpgsqlCommand(sql, this.cone).ExecuteReader();
            var todosLosArticulos = new List<dynamic>();

            while (reader.Read())
            {
               dynamic articulo = new ExpandoObject();

               articulo.id_art = reader.GetInt32(0);
               articulo.ced = reader.GetString(1);
               articulo.titulo = reader.GetString(2);
               articulo.desc = reader.GetString(3);
               articulo.cont = reader.GetString(4);
               articulo.estado = reader.GetBoolean(5);
               //articulo.fecha = reader.GetString(6);

               todosLosArticulos.Add(articulo);

            }
            var Json = JsonConvert.SerializeObject(todosLosArticulos);
            return Json;
         }
         catch (Exception E)
         {
            Mensaje = "Error" + E;
         }
         return Mensaje;
      }

      public String listarArticulosAprobados(int offset)
      {
         String Mensaje = "";
         try
         {
            NpgsqlCommand cmd = new NpgsqlCommand();
            String sql = "";
            sql = "select * from articulo where estado_publicacion = true order by id_articulo LIMIT 3 OFFSET " + offset + ";";
            var reader = new NpgsqlCommand(sql, this.cone).ExecuteReader();
            var todosLosArticulos = new List<dynamic>();

            while (reader.Read())
            {
               dynamic articulo = new ExpandoObject();

               articulo.id_art = reader.GetInt32(0);
               articulo.ced = reader.GetString(1);
               articulo.titulo = reader.GetString(2);
               articulo.desc = reader.GetString(3);
               articulo.cont = reader.GetString(4);
               articulo.estado = reader.GetBoolean(5);
               //articulo.fecha = reader.GetString(6);

               todosLosArticulos.Add(articulo);

            }

            var Json = JsonConvert.SerializeObject(todosLosArticulos);
            return Json;
         }
         catch (Exception E)
         {
            Mensaje = "Error" + E;
         }
         return Mensaje;
      }
      public String consultar()
      {
         String Mensaje = "";
         try
         {
            NpgsqlCommand cmd = new NpgsqlCommand();
            String sql = "";

            if (this.titulo != "vacio")
               sql = "select * from articulo where cedula='" + this.ced + "' and titulo='" + this.titulo + "';";

            if (this.id_art != -1)
               sql = "select * from articulo where cedula='" + this.ced + "' and id_articulo='" + this.id_art + "';";

            var parameters = new Dictionary<String, String>();
            var reader = new NpgsqlCommand(sql, this.cone).ExecuteReader();

            this.ced = null;
            while (reader.Read())
            {
               this.id_art = reader.GetInt32(0);
               this.titulo = reader.GetString(2);
               this.desc = reader.GetString(3);
               this.cont = reader.GetString(4);
            }
            var Json = JsonConvert.SerializeObject(new { id_articulo = this.id_art, titulo = this.titulo, descripcion = this.desc, contenido = this.cont });
            return Json;
         }
         catch (Exception E)
         {
            Mensaje = "Error" + E;
         }
         return Mensaje;
      }

      public String modificarArticulo()
      {
         try
         {
            NpgsqlCommand cmd = new NpgsqlCommand();
            String sql = "UPDATE articulo SET titulo='" + this.titulo + "',descripcion='" + this.desc + "',contenido='" + this.cont + "' where id_articulo=" + this.id_art + ";";
            cmd = new NpgsqlCommand(sql, this.cone);
            cmd.ExecuteNonQuery();
            return "Datos modificados satisfactoriamente";
         }
         catch (Exception)
         {
            return "Error, los datos no fueron guardados";
         }

      }
      public String modificarArticulo2()
      {
         try
         {
            NpgsqlCommand cmd = new NpgsqlCommand();
            String sql = "UPDATE articulo SET estado_publicacion='" + this.estado + "' where id_articulo=" + this.id_art + ";";
            cmd = new NpgsqlCommand(sql, this.cone);
            cmd.ExecuteNonQuery();
            return "Datos modificados satisfactoriamente";
         }
         catch (Exception)
         {
            return "Error, los datos no fueron guardados";
         }

      }

      public String eliminarArticulo()
      {
         try
         {
            NpgsqlCommand cmd = new NpgsqlCommand();
            String sql = "DELETE FROM articulo WHERE cedula = '" + this.ced + "' and titulo = '" + this.titulo + "'";
            cmd = new NpgsqlCommand(sql, this.cone);
            cmd.ExecuteNonQuery();
            return "Articulo eliminado satisfactoriamente";
         }
         catch (Exception e)
         {
            return "Error, el articulo no fue eliminado. " + e;
         }

      }

   }
}
