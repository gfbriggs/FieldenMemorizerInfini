using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using System.Data.Entity;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using System;
using FieldenBriggsMemorizerInfini.Models;

namespace FieldenMemorizer.Models
{
    // Vous pouvez ajouter des données de profil pour l'utilisateur en ajoutant d'autres propriétés à votre classe ApplicationUser, consultez http://go.microsoft.com/fwlink/?LinkID=317594 pour en savoir davantage.
    public class ApplicationUser : IdentityUser
    {
        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<ApplicationUser> manager, string authenticationType)
        {
            // Notez que authenticationType doit correspondre à l'instance définie dans CookieAuthenticationOptions.AuthenticationType
            var userIdentity = await manager.CreateIdentityAsync(this, authenticationType);
            // Ajouter des revendications d’utilisateur personnalisées ici
            return userIdentity;
        }

        [InverseProperty("ApplicationUser")]
        public ICollection<Memo> Memos { get; set; }
    }

    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext()
            : base("DefaultConnection", throwIfV1Schema: false)
        {
            Database.SetInitializer(new Initializer());
            Database.Initialize(false);
        }

        public static ApplicationDbContext Create()
        {
            return new ApplicationDbContext();
        }

        public DbSet<Memo> Memos { get; set; }
    }

    public class Initializer : DropCreateDatabaseAlways<ApplicationDbContext>
    {
        protected override void Seed(ApplicationDbContext context)
        {
            UserManager<ApplicationUser> mgr = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(context));
            ApplicationUser user = new ApplicationUser();
            user.UserName = "User1";         
            user.Email = "test@test.com";
            mgr.Create(user, "Passw0rd!");

            context.Memos.Add(new Memo { Text = "Note 1", Titre = "Title 1", date = DateTime.Now });
            context.Memos.Add(new Memo { Text = "Note 2", Titre = "Title 2", date = DateTime.Now });
            context.Memos.Add(new Memo { Text = "Note 3", Titre = "Title 3", date = DateTime.Now });
        }
    }
}