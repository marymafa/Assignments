const passport = require('passport');
const jwtSecrete = require('./jwtConfig');
var express = require('express');
var app = express();
const jwt = require("jwt-simple");
const connectionString = 'postgres://postgres:TCGPC1@localhost:5432/store_products';
const { Client } = require('pg');
const client = new Client({
    connectionString: connectionString,
})
client.connect();

module.exports = auth => {
    app.post('/loginData', passport.authenticate("login"), async function (req, res, next) {
        console.log("body", req.body);
        const customer = await client.query('SELECT *  FROM customer WHERE id=id').then(users => {
            return users.rows[0];
            console.log("this is my users", users.rows[0].password)
        })
        const token = jwt.encode(customer, 'jwt-secret');
        console.log("this is the token", token);
        res.json({ 'jwt-secret': token });
    });
}
