using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using FieldenBriggsMemorizerInfini.Models;
using FieldenMemorizer.Models;

namespace FieldenMemorizer.Controllers
{
   [RoutePrefix("api/Memos")]
    public class MemosController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: api/Memos
        [HttpGet]
        [Route("GetMemos")]
        [ResponseType(typeof(List<Memo>))]
        public IHttpActionResult GetMemos()
        {
            return Ok(db.Memos.ToList());
        }
        [HttpGet]
        // GET: api/Memos/5
        [ResponseType(typeof(Memo))]
        public IHttpActionResult GetMemo(int id)
        {
            Memo memo = db.Memos.Find(id);
            if (memo == null)
            {
                return NotFound();
            }

            return Ok(memo);
        }
        
        [Route("ChangeMemo")]
        [HttpPost]
        [ResponseType(typeof(void))]
        public IHttpActionResult ChangeMemo(Memo memo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Entry(memo).State = EntityState.Modified;

                db.SaveChanges();

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Memos
        [HttpPost]
        [Route("AddMemo")]
        [ResponseType(typeof(Memo))]
        public IHttpActionResult AddMemo(Memo memo)
        {
            memo.date = DateTime.Now;
            
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            db.Memos.Add(memo);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = memo.MemoID }, memo);
        }

        // DELETE: api/Memos/5
        [ResponseType(typeof(Memo))]
        public IHttpActionResult DeleteMemo(int id)
        {
            Memo memo = db.Memos.Find(id);
            if (memo == null)
            {
                return NotFound();
            }

            db.Memos.Remove(memo);
            db.SaveChanges();

            return Ok(memo);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool MemoExists(int id)
        {
            return db.Memos.Count(e => e.MemoID == id) > 0;
        }
    }
}