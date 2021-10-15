using Newtonsoft.Json;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Threading.Tasks;

namespace Revista.Models
{
   public class ClsUsuario
   {
      String ced { set; get; }
      String nom1 { set; get; }
      String nom2 { set; get; }
      String apell1 { set; get; }
      String apell2 { set; get; }
      String email { set; get; }

      String clave { set; get; }

      int tipo_usuario { set; get; }

      NpgsqlConnection cone;

      //public ClsUsuario(string ced, string nom1, string nom2, string apell1, string apell2, string email, string clave, int tipo_usuario)
      public ClsUsuario(string ced, string nom1, string nom2, string apell1, string apell2, string email, string clave, int tipo_usuario)
      {
         this.ced = ced;
         this.nom1 = nom1;
         this.nom2 = nom2;
         this.apell1 = apell1;
         this.apell2 = apell2;
         this.email = email;
         this.clave = clave;
         this.tipo_usuario = tipo_usuario;
      }

      public void conectar()
      {
         this.cone = new NpgsqlConnection("Server= 127.0.0.1; User Id=admin; Password=123; Database=RevistaDB ");
         this.cone.Open();
      }
      public String ingresarUsuario()
      {
         try
         {
            NpgsqlCommand cmd = new NpgsqlCommand();
            //String sql = "INSERT INTO usuario VALUES ('" + this.ced + "','" + this.nom1 + "','" + this.nom2 + "','" + this.apell1 + "','" + this.apell2 + "','" + this.email + "','" + this.clave + "',"+ this.tipo_usuario + ")";
            String sql = "INSERT INTO usuario VALUES ('" + this.ced + "','" + this.nom1 + "','" + this.nom2 + "','" + this.apell1 + "','" + this.apell2 + "','" + this.email + "','" + this.clave + "'," + this.tipo_usuario + ")";
            cmd = new NpgsqlCommand(sql, this.cone);
            cmd.ExecuteNonQuery();
            return "Datos ingresados satisfactoriamente";

         }
         catch (Exception)
         {
            return "Error, los datos no fueron guardados";
         }

      }

      public String eliminarUsuario()
      {
         try
         {
            NpgsqlCommand cmd = new NpgsqlCommand();
            String sql = "DELETE FROM usuario WHERE cedula = '" + this.ced + "'";
            cmd = new NpgsqlCommand(sql, this.cone);
            cmd.ExecuteNonQuery();
            return "Usuario eliminado satisfactoriamente";

         }
         catch (Exception)
         {
            return "Error, el usuario no fue eliminado";
         }

      }

      public int autenticar()
      {
         String Mensaje = "";
         try
         {
            NpgsqlCommand cmd = new NpgsqlCommand();
            String sql = "select * from usuario where cedula='" + this.ced + "' and clave='" + this.clave + "'";

            var parameters = new Dictionary<String, String>();

            var reader = new NpgsqlCommand(sql, this.cone).ExecuteReader();

            this.ced = null;

            while (reader.Read())
            {
               this.ced = reader.GetString(0);
               this.nom1 = reader.GetString(1);
               this.nom2 = reader.GetString(2);
               this.apell1 = reader.GetString(3);
               this.apell2 = reader.GetString(4);
               this.email = reader.GetString(5);
               this.clave = reader.GetString(6);
               this.tipo_usuario = reader.GetInt32(7);
               //this.edad = reader.GetInt32(2);
               //parameters.Add("nom", this.nombre);
               //parameters.Add("edad", "" + this.edad);
            }
            if (this.ced != null)
            {
               return this.tipo_usuario;
            }
            else
               return 0;
         }
         catch (Exception E)

         {
            Mensaje = "Error" + E;
         }
         return -1;
      }

      public String listarAutores(int offset)
      {
         String Mensaje = "";
         try
         {
            NpgsqlCommand cmd = new NpgsqlCommand();

            String sql = "";

            sql = "select * from usuario where tipo_usuario=1 LIMIT 3 OFFSET " + offset;


            var reader = new NpgsqlCommand(sql, this.cone).ExecuteReader();

            var todosLosAutores = new List<dynamic>();

            while (reader.Read())
            {
               dynamic autor = new ExpandoObject();

               autor.ced = reader.GetString(0);
               autor.nom1 = reader.GetString(1);
               autor.nom2 = reader.GetString(2);
               autor.apell1 = reader.GetString(3);
               autor.apell2 = reader.GetString(4);
               autor.email = reader.GetString(5);

               todosLosAutores.Add(autor);

            }

            var Json = JsonConvert.SerializeObject(todosLosAutores);
            return Json;
         }
         catch (Exception E)

         {
            Mensaje = "Error" + E;
         }
         return Mensaje;
      }
   }
}
