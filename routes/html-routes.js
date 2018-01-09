// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

    // Each of the below routes just handles the HTML page that the user gets sent to.

    // index route loads home.html
    app.get("/", function(req, res) {
        res.render("index.handlebars");
    });

    // services route loads services.html
    app.get("/contact", function(req, res) {
        res.render("contact.handlebars");
    });

    // login route loads admin.html
    app.get("/login", function(req, res) {
        res.render("login.handlebars");
    });

    // signup route loads admin.html
    app.get("/signup", function(req, res) {
        res.render("signup.handlebars");
    });

    //logout route
    app.get("/logout", function(req, res) {
        res.redirect("/");
    });

    // admin route loads admin.html
    app.get("/admin", function(req, res) {
        res.render("admin.handlebars");
    });

    // accept route loads accept.html
    app.get("/admin/view", function(req, res) {
        res.render("viewjob.handlebars");
    });

    app.get("/admin/accept", function(req, res) {
        res.render("accept.handlebars");
    })
    
    app.get("/admin/monthly", function(req, res) {
        res.render("monthlyReport.handlebars");
    });

    // assign route loads assign.html
    app.get("/admin/assign", function(req, res) {
        res.render("assign.handlebars");
    })

  app.get("/admin/accept", function(req, res){
    res.render("accept.handlebars");
  })
  app.get("/admin/report", function(req, res) {
    res.render("weekly.handlebars");
  });
  app.get("/admin/monthly", function(req, res) {
    res.render("monthlyReport.handlebars");
  });

  // assign route loads accept.html
  app.get(" /admin/assign", function(req, res){
    res.render("assign.handlebars");
  })

};
