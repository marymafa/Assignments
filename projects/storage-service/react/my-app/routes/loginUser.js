const passport = require('passport');
const jwt = require('jsonwebtoken');
const jwtSecrete = require('./routes/jwtConfig');

module.export = app => {
    app.get('/loginData', (req, res, next) => {
        console.log("testing", req.body);
        passport.authenticate('login', (err, user, info) => {
            if (err) {
                console.log(ErrorEvent)
            }
            if (info !== undefined) {
                console.log(info.message);
                res.send(info.message);
            } else {
                req.logIn(user, err => {
                    userDetails.findOne({
                        where: {
                            email: user.email
                        }
                    }).then(user => {
                        const token = jwt.sign({ id: user.email }, jwtSecrete.secret);
                        res.status(200).send({
                            auth: true,
                            token: token,
                            message: 'user found & logged in'
                        })
                    })
                })
            }
        })(req, res, next)
    })
}