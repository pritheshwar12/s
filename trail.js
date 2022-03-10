var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
 service: "gmail",
 auth: { user: 'bannu1797@gmail.com',
  pass: 'newprojectpassword' },
      tls: {
          rejectUnauthorized: false
      }
  });

  var mailOptions = {
  from: "bannu1797@gmail.com",
   to: "pritheshwar12@gmail.com",
   subject: "great",
   text: "helllo"
   };
    transporter.sendMail(mailOptions, function(error, info){
     if (error)
     { console.log(error); }
      else { console.log('Email sent: ' + info.response); }
      });
