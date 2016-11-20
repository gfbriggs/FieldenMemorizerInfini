using FieldenMemorizer.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace FieldenBriggsMemorizerInfini.Models
{
    public class Memo
    {
       [Key]
       public int MemoID { get; set;}
       [Required, MaxLength(30, ErrorMessage = "Le titre est trop grand")]
       public string Titre { get; set; }
       [Required]
       public string Text { get; set; }
       [Required, DataType(DataType.DateTime)]
       public DateTime date { get; set; }
       [InverseProperty("Memos")]
       public virtual ApplicationUser Utilisateur { get; set;}
      
    }
}