const passport = require('passport');
const jwt = require('jsonwebtoken');
const jwtSecrete = require('./jwtConfig');
var express = require('express');
var app = express();
const connectionString = 'postgres://postgres:TCGPC1@localhost:5432/store_products';
const { Client } = require('pg');
const client = new Client({
    connectionString: connectionString,
})
client.connect();

module.exports = app => {
    app.post('/loginData', passport.authenticate("login"), function (req, res, next) {
        console.log("body", req.body);
        const customer = client.query('SELECT *  FROM customer WHERE id=id');
        console.log("customer", customer);

        const token = jwt.encode(customer.id, 'jwt-secret');
        console.log(token);
        res.json({ token: token });


    });
}


