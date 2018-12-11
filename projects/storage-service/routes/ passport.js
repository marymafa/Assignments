const salt = 10;
const express = require('express');
const app = express();
const jwt = require("jwt-simple");
const passport = require('passport');
const passportJWT = require("passport-jwt");
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
const bcrypt = require('bcrypt');
localStrategy = require('passport-local').Strategy;
const connectionString = 'postgres://postgres:TCGPC1@localhost:5432/store_products';
const { Client } = require('pg');
const client = new Client({
    connectionString: connectionString,
})
client.connect();
module.exports = function (passport,res) {
    passport.use('login', new localStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            session: false
        },
        (email, password, cb) => {
            console.log("check password and username ", email, password);
            client.query('SELECT id, username, email, password FROM customer WHERE email =$1', [email], ( err, results) => {
                var user = results.rows[0];
                console.log("user", user, results)
                try {
                    if (err) {
                        res.status(203).json({ message: 'incorrect password or email' }).end();
                        return cb(null, false, { message: 'incorrect password or email' });
                    }
                    if (results.rowCount <= 0) {
                        res.status(203).json({ message: 'incorrect password or email' }).end();
                        return cb(null, false, { message: 'incorrect password or email' });
                    }
                    bcrypt.compare(password, user.password, function (user, err) {
                        if (err) {
                            return cb(null, false, { message: 'incorrect password or email' });
                        }

                    })
                    const token = jwt.encode(user, 'jwt-secret');
                    console.log("this is the token", token);
                    res.status(201).json(token).end();
                    return cb(null, user, {
                        message: 'Logged In Successfully'
                    });
                } catch (err) {
                    cb(err)
                }
            })
        }));

    passport.serializeUser(function (user, done) {
        done(null, user);
    });
    passport.deserializeUser(function (user, done) {
        done(null, user);
    });
    passport.use(new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: 'jwt-secret'
    },
        function (jwtPayload, cb) {
            return user.findOneById(jwtPayload.id)
                .then(user => {
                    return cb(null, user);
                })
                .catch(err => {
                    return cb(err);
                });
        }
    ));
}




