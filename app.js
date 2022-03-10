//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
const _ = require("lodash");
var nodemailer = require('nodemailer');

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const app = express();
mongoose.connect("mongodb+srv://admin-bannu:test123@cluster0.aodap.mongodb.net/disasterDB");

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));


const postSchema = {
  title: String,
  content: String
};
const memberSchema = {
  name: String,
  email: String,
  countryCode: String,
  phone: String,
  password:String,
  address: String
};

const Post = mongoose.model("Post", postSchema);
const Member = mongoose.model("Member", memberSchema);

// start
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: 'bannu1797@gmail.com',
    pass: 'newprojectpassword'
  },
  tls: {
    rejectUnauthorized: false
  }
});

app.get("/em", function(req, res) {
  Member.find({}, function(err, records) {
    records.forEach(function(record) {
      var mailOptions = {
        from: "bannu1797@gmail.com",
        to: record.email,
        subject: "Alert",
        text: "check the quick response wensite to know about disaster"
      };
      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

    });
  });
  res.redirect("/");
})
// end

app.get("/", function(req, res) {
  Post.find({}, function(err, posts) {
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
    });
  });

});

app.get("/about", function(req, res) {
  res.render("about", {
    aboutContent: aboutContent
  });
});

app.get("/volunter", function(req, res) {
  Member.find({}, function(err, records) {
    res.render("volunter", {

      records: records
    });
  });
});

app.get("/compose", function(req, res) {
  res.render("compose");
});
app.get("/register", function(req, res) {
  res.render("register");
});
app.post("/compose", function(req, res) {
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });

  post.save(function(err) {
    if (!err) {
      res.redirect("/");
    }
  });

});
app.post("/volunter", function(req, res) {
  const member = new Member({
    name: req.body.name,
    email: req.body.email,
    countryCode: req.body.pin,
    phone: req.body.phone,
    password:req.body.password,
    address: req.body.address
  });

  member.save(function(err) {
    if (!err) {
      res.redirect("/");
    }
  });


});

app.get("/posts/:postId", function(req, res) {
  // const requestedTitle = _.lowerCase(req.params.postName);
  const requestedPostId = req.params.postId;
  Post.findOne({
    _id: requestedPostId
  }, function(err, post) {

    res.render("post", {
      title: post.title,
      content: post.content
    });

  });

});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
