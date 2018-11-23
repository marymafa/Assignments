const salt = 10;
const bcrypt = require('bcrypt');
const user = require('./findUsers')
const jwtSecrete = require('./jwtConfig')
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
localStrategy = require('passport-local').Strategy;
ExtractJWT = require('passport-jwt').ExtractJwt;

module.exports = function (app, passport) {
    passport.use(
        'register',
        new localStrategy({
            usernameField: "username",
            emailField: "email",
            passwordField: "password",
            session: false
        },
            (email, password, done) => {
                try {
                    user.findOne({
                        where: {
                            username: username,
                        },
                    }).then(
                        username => {
                            if (username != null) {
                                console.log('username already taken');
                                return done(null, false, { message: `user already taken` })
                            } else {
                                bcrypt.hash(password, salt).then(hashedPassword => {
                                    user.create({ username, password }).then(user => {
                                        console.log('user created')
                                        return done(null, user)
                                    })
                                })
                            }
                        }
                    )
                } catch (error) {
                    done(err)
                }
            }
        )
    );
    passport.use(
        'login',
        new localStrategy(
            {
                usernameField: 'email',
                passwordField: 'passwd',
                session: false,
            },
            (username, password, done) => {
                try {
                    user.findOne({
                        where: {
                            email: email
                        }
                    }).then(user => {
                        if (user === null) {
                            return done(null, false, { message: 'bad username' });

                        } else {
                            bcrypt.compare(password, user.password).then(response => {
                                if (response !== true) {
                                    console.log('password do not match')
                                }
                            })
                        }
                        console.log('user found & authenticated');
                        return done(null, user)
                    })
                } catch (error) {
                    done(error)
                }
            }
        )
    );
    const options = {
        jwtFromRequest: ExtractJWT.JwtFromRequestFunction('jwt'),
        secretOrKey: jwtSecrete.secret,
    }

    passport.use(
        'jwt',
        new JwtStrategy(options, (jwt_payload, done) => {
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
                done(err)

            }
        })
    );
}