var request = require('request');
var express = require("express");
var myapp = express();
const url = 'https://api.twitter.com/1.1/statuses/update.json';
    myapp.get("/", function (req, res) {
        res.send("hello world");
    });

    myapp.listen(3000, () => console.log("working"));

