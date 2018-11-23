const passport = require('passport');
module.export = app => {
    app.post('/signUpData', (reg, res, next) => {
        passport.authenticated('register', (err, user, info) => {
            if (err) {
                console.log(err);
            }
            if (info !== undefined) {
                console.log(info.message);
                res.send(info.message);
            } else {
                req.logIn(user, err => {
                    const data = {
                        username: req.body.username,
                        email: req.body.email,
                        password: req.body.password,
                    };
                    User.findOne({
                        where: {
                            username: data.username
                        },
                    }).then(user => {
                        user.update({
                            email: data.email,
                            password: data.password
                        })
                            .then(() => {
                                console.log('user created in bd');
                                res.status(200).send({ message: "user created" })
                            })
                    })
                })
            } (req, res, next)
        })
    })
}