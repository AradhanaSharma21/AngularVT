using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.ModelBinding;
using System.Web.Http.OData;
using System.Web.Http.OData.Routing;
using Innotym.data;

namespace Innotym.api.Controllers
{
    /*
    The WebApiConfig class may require additional changes to add a route for this controller. Merge these statements into the Register method of the WebApiConfig class as applicable. Note that OData URLs are case sensitive.

    using System.Web.Http.OData.Builder;
    using System.Web.Http.OData.Extensions;
    using Innotym.data;
    ODataConventionModelBuilder builder = new ODataConventionModelBuilder();
    builder.EntitySet<Transaction>("Transactions");
    builder.EntitySet<UserDetail>("UserDetails"); 
    config.Routes.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
    */
    public class TransactionsController : ODataController
    {
        private InnotymEntities db = new InnotymEntities();

        // GET: odata/Transactions
        [EnableQuery]
        public IQueryable<Transaction> GetTransactions()
        {
            return db.Transactions;
        }

        // GET: odata/Transactions(5)
        [EnableQuery]
        public SingleResult<Transaction> GetTransaction([FromODataUri] int key)
        {
            return SingleResult.Create(db.Transactions.Where(transaction => transaction.TransId == key));
        }

        // PUT: odata/Transactions(5)
        public IHttpActionResult Put([FromODataUri] int key, Delta<Transaction> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Transaction transaction = db.Transactions.Find(key);
            if (transaction == null)
            {
                return NotFound();
            }

            patch.Put(transaction);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TransactionExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(transaction);
        }

        // POST: odata/Transactions
        public IHttpActionResult Post(Transaction transaction)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Transactions.Add(transaction);
            db.SaveChanges();

            return Created(transaction);
        }

        // PATCH: odata/Transactions(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public IHttpActionResult Patch([FromODataUri] int key, Delta<Transaction> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Transaction transaction = db.Transactions.Find(key);
            if (transaction == null)
            {
                return NotFound();
            }

            patch.Patch(transaction);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TransactionExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(transaction);
        }

        // DELETE: odata/Transactions(5)
        public IHttpActionResult Delete([FromODataUri] int key)
        {
            Transaction transaction = db.Transactions.Find(key);
            if (transaction == null)
            {
                return NotFound();
            }

            db.Transactions.Remove(transaction);
            db.SaveChanges();

            return StatusCode(HttpStatusCode.NoContent);
        }

        // GET: odata/Transactions(5)/UserDetail
        [EnableQuery]
        public SingleResult<UserDetail> GetUserDetail([FromODataUri] int key)
        {
            return SingleResult.Create(db.Transactions.Where(m => m.TransId == key).Select(m => m.UserDetail));
        }

        // GET: odata/Transactions(5)/UserDetail1
        [EnableQuery]
        public SingleResult<UserDetail> GetUserDetail1([FromODataUri] int key)
        {
            return SingleResult.Create(db.Transactions.Where(m => m.TransId == key).Select(m => m.UserDetail1));
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TransactionExists(int key)
        {
            return db.Transactions.Count(e => e.TransId == key) > 0;
        }
    }
}
