const passport = require('passport');
const jwtSecrete = require('./jwtConfig');
var express = require('express');
var app = express();
const jwt = require("jwt-simple");
const connectionString = 'postgres://postgres:TCGPC1@localhost:5432/store_products';
const { Client } = require('pg');
const bcrypt = require('bcrypt');

const client = new Client({
    connectionString: connectionString,
})
client.connect();

module.exports = app => {
    app.post('/loginData', async (req, res, next) => {
        const { password, email } = req.body;
        console.log(password, email)

        const statement = `select * from customer where email = $1`;

        const userFound = await client.query(statement, [email]);
        if (userFound.rows[0] == undefined) {
            return res.status(404).json({ errors: "user not found" });
        }

        console.log("userFound");
        try {
            const user = await bcrypt.compare(password, userFound.rows[0].password);
            if (!user) {
                return res.status(404).json({ errors: "password is incorrect" });
            }

            return res.json("password correct");

        } catch (e) {
            console.log(e);
        }



        const token = jwt.encode(user, 'jwt-secret');
        return res.json({ user, token });
    })

}

