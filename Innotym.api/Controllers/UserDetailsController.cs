﻿using System;
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
    builder.EntitySet<UserDetail>("UserDetails");
    builder.EntitySet<Transaction>("Transactions"); 
    config.Routes.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
    */
    public class UserDetailsController : ODataController
    {
        private InnotymEntities db = new InnotymEntities();

        // GET: odata/UserDetails
        [EnableQuery]
        public IQueryable<UserDetail> GetUserDetails()
        {
            return db.UserDetails;
        }

        // GET: odata/UserDetails(5)
        [EnableQuery]
        public SingleResult<UserDetail> GetUserDetail([FromODataUri] int key)
        {
            return SingleResult.Create(db.UserDetails.Where(userDetail => userDetail.UserId == key));
        }

        // PUT: odata/UserDetails(5)
        public IHttpActionResult Put([FromODataUri] int key, Delta<UserDetail> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            UserDetail userDetail = db.UserDetails.Find(key);
            if (userDetail == null)
            {
                return NotFound();
            }

            patch.Put(userDetail);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserDetailExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(userDetail);
        }

        // POST: odata/UserDetails
        public IHttpActionResult Post(UserDetail userDetail)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.UserDetails.Add(userDetail);
            db.SaveChanges();

            return Created(userDetail);
        }

        // PATCH: odata/UserDetails(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public IHttpActionResult Patch([FromODataUri] int key, Delta<UserDetail> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            UserDetail userDetail = db.UserDetails.Find(key);
            if (userDetail == null)
            {
                return NotFound();
            }

            patch.Patch(userDetail);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserDetailExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(userDetail);
        }

        // DELETE: odata/UserDetails(5)
        public IHttpActionResult Delete([FromODataUri] int key)
        {
            UserDetail userDetail = db.UserDetails.Find(key);
            if (userDetail == null)
            {
                return NotFound();
            }

            db.UserDetails.Remove(userDetail);
            db.SaveChanges();

            return StatusCode(HttpStatusCode.NoContent);
        }

        // GET: odata/UserDetails(5)/Transactions
        [EnableQuery]
        public IQueryable<Transaction> GetTransactions([FromODataUri] int key)
        {
            return db.UserDetails.Where(m => m.UserId == key).SelectMany(m => m.Transactions);
        }

        // GET: odata/UserDetails(5)/Transactions1
        [EnableQuery]
        public IQueryable<Transaction> GetTransactions1([FromODataUri] int key)
        {
            return db.UserDetails.Where(m => m.UserId == key).SelectMany(m => m.Transactions1);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool UserDetailExists(int key)
        {
            return db.UserDetails.Count(e => e.UserId == key) > 0;
        }
    }
}
