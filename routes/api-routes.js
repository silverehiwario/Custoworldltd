// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");


// Routes
// =============================================================
module.exports = function(app) {

    // GET route for getting all of the jobs
    app.get("/api/jobs", function(req, res) {
        console.log('admin view')
        var query = {};
        if (req.query.id) {
            query.JobId = req.query.id;
        }

        db.Job.findAll({}).then(function(dbJob) {
            console.log('line 28', dbJob)
            console.log("...................")
            res.render("viewjob.handlebars", { Job: dbJob });
        });
    });

    // POST route for saving a new job

    // If a user sends data to add a new job...
    app.post("/api/new", function(req, res) {

        // Then add the job to the database using sequelize

        db.Job.create({
                client_name: req.body.client_name,
                client_location: req.body.client_location,
                client_contact: req.body.client_contact,
                services: req.body.services,
                specific_service: req.body.specific_service,
            })
            .then(function(result) {
                res.redirect("/api/accept/");
            });
    });

    app.get("/api/accept/", function(req, res) {
        db.Job.findAll({
                where: {
                    job_status: "unaccepted"
                }
            })
            .then(function(result) {
                // return res.json(result);
                res.render("accept.handlebars", { Job: result });
            });
    });

    // Delete a Job
    app.post("/api/delete", function(req, res) {
        console.log("Job Data:");
        console.log(req.body);
        db.Job.destroy({
                where: {
                    id: req.body.job_id
                }
            })
            .then(function(result) {
                res.redirect("/api/accept")
            })
    });

    app.post("/api/update", function(req, res) {
        db.Job.update({
                job_status: "accepted"
            }, {
                where: {
                    id: req.body.job_id
                }
            })
            .then(function(result) {
                res.redirect("/api/accept")
            })
    });

    app.get("/api/getDate", function(req, res) {
        console.log('req.body');
        db.Job.findAll({

            where: {
                createdAt: {
                    $between: [req.query.startdate, req.query.endDate]
                }
            },
        }).then(function(result) {
            console.log("...................")
            console.log('line 28', result)
            console.log("...................")
            res.render("weekly.handlebars", { Job: result });

        });
    });


    // Get for monthly report
    app.get("/api/getDetails", function(req, res) {
        var sequelize = require('sequelize');
        db.Job.findAll({
            where:
                //{createdAt:'2016-01-11T00:00:00.000Z'},
                sequelize.where(sequelize.fn('DATE_FORMAT', sequelize.col('Job.createdAt'), '%b-%Y'), req.query.date3),
        }).then(function(result) {
            console.log('line 28', result)
            console.log("...................")
            // res.redirect("/api/month/");
            res.render("monthlyReport.handlebars", { Job: result });
            // res.render("report",{Job:result});

        });
    });
    //----------------------------------------
    // Routes for assign page
    //----------------------------------------
    app.get("/api/assign/", function(req, res) {

        db.Job.findAll({

                where: {
                    job_status:[ "inProgress", "hold", "accepted"]
                },

                }).then(function(result) {
                console.log(result);
                // return res.json(result);
                res.render("assign.handlebars", { Job: result });
            });
    });



    app.post("/api/update2", function(req, res) {

       // Then add the job to the database using sequelize

        db.Job.update({

             job_status: req.body.Status,
            }, {
                where: {
                    id: req.body.ID,
                }


            }).then(function(result) {
                console.log(result);
             res.redirect("/api/assign");
                    });

            });




    app.post ("/admin", function(req, res) {

        var website = req.body.web;
      if (req.files){

      var file = req.files.uploaded_image;
      var img_name = file.name;

      if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"||file.mimetype == "image/gif" ||file.mimetype == "image/jpg" ||file.mimetype == "image/bmp" ){

             file.mv('public/images/upload_images/'+ file.name, function(err) {

               if (err)

                 return res.status(500).send(err);

          // Then add the advert to the database using sequelize
           db.Advert.create({
                upload_image: img_name,
                input_website: website,
                })
           .then(function(result) {
                res.render("index.handlebars");
              });
           });
     } else {

    res.send("This format is not allowed , please upload file with '.png','.gif','.jpg' ,'.jpeg', '.bmp'");
  }
} else {
  return res.status(400).send('No files were uploaded.');

     res.redirect("admin.handlebars");
 }

});


app.get("/index", function(req, res) {

   db.Advert.findAll({}).then(function(result) {

          console.log(result);

          res.json(result);
   });
 });




 app.post("/send",  function (req, res)  {
  const output = `
  <p> You have a new contact request</p>
  <h3> Contact Details </h3>
  <ul>
  <li>Name: ${req.body.myname}</li>
  <li>Email address: ${req.body.email}</li>
  <li>Telephone: ${req.body.telephone}</li>
  </ul>
  <h3> Message </h3>
  <p>${req.body.message}</p>
  `;
  // create reusable transporter object using the default SMTP transport
     var nodemailer = require("nodemailer");

    let transporter = nodemailer.createTransport({
        host: 'custosynergyltd.herokuapp.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'custoworldltd@gmail.com', // generated ethereal user
            pass: 'custoworld126'  // generated ethereal password
        },
        tls:{
          rejectUnauthorized:false
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Custosynergy" <custoworldltd@gmail.com>', // sender address
        to: 'custoworldltd@gmail.com, silverehiwario@gmail.com', // list of receivers
        subject: 'Custosynergy contact request', // Subject line
        text: 'Hello world?', // plain text body
        html: output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        res.render ("index.handlebars");


    });
});


 app.post("/api/signup", function(req, res) {

    db.User.create({
            user_name: req.body.user_name,
            password: req.body.password,
            role: req.body.role,

          }).then(function(result) {
            res.send ("/login");
        });

       });


       app.post("/api/login", function(req, res) {

         if (req.body.user_name === "authority" || req.body.password === "authority126"){

               res.send("/admin");}  else  {

                 res.send("/login")
               }
     });


    };
