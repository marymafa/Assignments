const salt = 10;
const bcrypt = require('bcrypt');
const user = require('./findUsers')
const jwtSecrete = require('./jwtConfig')
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;

ExtractJWT = require('passport-jwt').ExtractJwt;
localStrategy = require('passport-local').Strategy;

module.export = function (app, passport) {
    //register strategy
    passport.use('register', new localStrategy(
        {
            usernameField: "username",
            emailField: "email",
            passwordField: "password",
            session: false
        },
        (username, password, cb) => {
            const hash = bcrypt.genSalt(req.body.password, salt);
            console.log("hash", hash);
            try {
                user.findOne({
                    where: {
                        username: username,
                    },
                }).then(user => {
                    if (username != null) {
                        console.log('username already taken');
                        return cb(null, false, { message: `user already taken` })
                    } else {
                        client.query('INSERT INTO  customer(username,email,password) VALUES($1,$2,$3)', [req.body.username, req.body.email, hash], (err, result) => {
                        });
                    }
                })
            } catch (error) {
                done(error)
            }

        }));


    // login strategy
    passport.use('login', new localStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            session: false
        },
        (username, password, cb) => {

            client.query('SELECT * FROM customer WHERE id=id', (err, result) => {

                try {
                    user.findOne({
                        where: {
                            email: email
                        }
                    }).then(user => {
                        if (user === null) {
                            return done(null, false, { message: 'bad username' });

                        } if (result.rows.length > 0) {
                            const first = result.rows[0]
                            bcrypt.compare(password, first.password, function (err, res) {
                                if (res) {
                                    cb(null, { id: first.id, email: first.email, password: first.password })
                                } else {
                                    cb(null, false)
                                } if (err) {
                                    console.log('Error when selecting user on login', err)
                                    return cb(err)
                                }
                            })
                        }
                    })
                } catch (error) {
                    done(error)
                }

            })
        }));

        //options
    const options = {
        jwtFromRequest: ExtractJWT.JwtFromRequestFunction('jwt'),
        secretOrKey: jwtSecrete.secret,
    }

    //jwt
    passport.use(
        'jwt',
        new JwtStrategy(options, (jwt_payload, cb) => {
            console.log('jwt_payload', jwt_payload);
            try {
                user.findOne({
                    where: {
                        username: jwt_payload.id
                    },
                }).then(user => {
                    if (user) {
                        console.log("user found in db in passport");
                        done(null, false);
                    } else {
                        console.log('user not found in db');
                        done(null, false);
                    }
                })
            } catch (error) {
                cb(err)

            }
        })
    );

    //arrange something in series
    passport.serializeUser((user, cb) => {
        cb(null, user.id)
    })
    
    //
    passport.deserializeUser((id, cb) => {
        client.query('SELECT FROM customer WHERE id = $1', [parseInt(id, 10)], (err, results) => {
            if (err) {
                console.log('Error when selecting user on session deserialize', err)
                return cb(err)
            }

            cb(null, results.rows[0])
        })
    })
}



