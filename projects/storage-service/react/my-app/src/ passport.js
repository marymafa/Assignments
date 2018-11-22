

const BCRYPT_SALT_ROUND = 10;
const bcrypt = require('bcrypt');
const jwtSecrete = require('./jwtConfig')
const passport = require('passport');
localStrategy = require('passport-local').Strategy;
UserDetails = require('./components/UserDetails');
JWTstrategy = require('passport-jwt');
ExtractJWT = require('passport-jwt');

passport.use(
    'register',
    new localStrategy({
        emailFiels: "email",
        passwordField: "password",
        session: false
    },
        (email, password, done) => {
            try {
                User.findOne({
                    where: {
                        username: username,
                    },
                }).then(
                    username => {
                        if (username != null) {
                            console.log('username already taken');
                            return done(null, false, { message: `user already taken` })
                        } else {
                            bcrypt.hash(password, BCRYPT_SALT_ROUND).then(hashedPassword => {
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
            emailField: "email",
            passwordField: "password",
            session: false,
        },
        (username, password, done) => {
            try {
                User.findOne({
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
    jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('jwt'),
    secretOrKey: jwtSecrete.secret,
}

passport.use(
    'jwt',
    new JWTstrategy(options, (jwt_payload, done) => {
        try {
            User.findOne({
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