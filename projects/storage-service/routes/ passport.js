const salt = 10;

const user = require('./findUsers')
var express = require('express');
var app = express();
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
module.exports = function (passport) {
    passport.use('login', new localStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            session: false
        },
        (username, password, cb) => {

            client.query('SELECT * FROM customer WHERE id=id', (err, result) => {
                let user = result.rows[0].email;
                var password = result.rows[0].password
                console.log("user", user);
                try {

                    if (!user) {
                        return cb(null, false, { message: 'Incorrect email or password.' });
                    }
                    bcrypt.compare(user, function (user, err) {
                        return cb(null, user, {
                            message: 'Logged In Successfully'
                        });
                    })

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
            //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
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




