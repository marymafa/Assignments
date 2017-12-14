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
            status: "Is it really working?"
        }
    };

;
request.post(access_point, function (err, res, body) {
    console.log("http res code", res.statusCode)
    console.log("http res body", res.body)
    if (err) {
        console.log(err);

    }
    myapp.get("/", function (req, res) {
        res.send("hello world");
    });

    myapp.listen(3000,() => console.log("working"));

})