


// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// ==============================================================================
var express = require("express");
var bodyParser = require("body-parser");
var passport = require("passport");
var dotenv = require("dotenv");
var session = require("express-session");
var http = require("http");
var busboy = require("then-busboy");
var fileUpload = require("express-fileupload");

const path = require("path");
const methodOverride = require("method-override");
const nodemailer = require("nodemailer");
// ==============================================================================
// Sets up the Express App
// ==============================================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Requiring our models for syncing
var db = require("./models");

// Creating express app and configuring middleware needed for authentication
var app = express();
app.use(bodyParser.urlencoded({ extended: true  }));
app.use(bodyParser.json());
app.use(express.static("public"));
// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(fileUpload());


// Static directory
app.use(express.static("public"));

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.set("view engine", "ejs");


require("./config/passport.js")(passport);
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);
require("./routes/auth-routes.js")(app);


// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  });
});
