const passport = require('passport');
var express = require('express');
var app = express();
var salt = 10;
const jwt = require("jwt-simple");

const bcrypt = require('bcrypt');
const connectionString = 'postgres://postgres:TCGPC1@localhost:5432/store_products';
const { Client } = require('pg');
const client = new Client({
    connectionString: connectionString,
})
client.connect();
module.exports = app => {


    app.post('/signUpData', (req, res) => {
        console.log("res", req.body);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);
        console.log("hashedPassword", hashedPassword)
        client.query('INSERT INTO  customer(username,email,password) VALUES($1,$2,$3)',
            [req.body.username, req.body.email, hashedPassword], (err, res) => {
                if (err) return err;
                const customer = client.query('SELECT *  FROM customer');
                console.log(customer);

                const token = jwt.encode(customer.id, 'jwt-secret');
                console.log(token);
                res.json({ token: token });
            })

    })


}




