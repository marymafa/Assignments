var request = require('request');
var express = require("express");
var myapp = express();
const url = 'https://api.twitter.com/1.1/statuses/update.json';

myapp.use(express.static('public'));

var oauth = {
    consumer_key: "ZbhKdT6PRuFtUAJrDpnLo1Y4q",
    consumer_secret: "MlxNWXkT3xZASZkOIdTy0j7ardAXipWiRCvw8C4tIwgDp6HkhX",
    token: "939032435123032064-IwZ1jgwKewN8vP6ciYMmxCcyX5SRaXd",
    token_secret: "88T1JFJY6HacspO1fYM1QuvCt5yktCZjnq4QzcCKaey0O"
};

access_point = {
    url: url,
    oauth: oauth,
    qs: {
        status: " working"
    }
};

exports.register = function(req,res){
  // console.log("req",req.body);
  var today = new Date();
  var users={
    "first_name":req.body.first_name,
    "last_name":req.body.last_name,
    "email":req.body.email,
    "password":req.body.password,
    "created":today,
    "modified":today
  }
  connection.query('INSERT INTO users SET ?',users, function (error, results, fields) {
  if (error) {
    console.log("error ocurred",error);
    res.send({
      "code":400,
      "failed":"error ocurred"
    })
  }else{
    console.log('The solution is: ', results);
    res.send({
      "code":200,
      "success":"user registered sucessfully"
        });
  }
  });
}

exports.login = function(req,res){
  var email= req.body.email;
  var password = req.body.password;
  connection.query('SELECT * FROM users WHERE email = ?',[email], function (error, results, fields) {
  if (error) {
    // console.log("error ocurred",error);
    res.send({
      "code":400,
      "failed":"error ocurred"
    })
  }else{
    // console.log('The solution is: ', results);
    if(results.length >0){
      if([0].password == password){
        res.send({
          "code":200,
          "success":"login sucessfull"
            });
      }
      else{
        res.send({
          "code":204,
          "success":"Email and password does not match"
            });
      }
    }
    else{
      res.send({
        "code":204,
        "success":"Email does not exits"
          });
    }
  }
  });
}


request.post(access_point, function (err, res, body) {
    console.log("http res code", res.statusCode)
    console.log("http res body", res.body)
    if (err) {
        console.log(err);

    }
    myapp.get("/", function (req, res) {
        res.send("hello world");
    });

    myapp.listen(3000, () => console.log("working"));

})