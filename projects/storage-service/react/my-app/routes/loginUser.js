import userDetails from '../components/UserDetails';
import jwtSecrete from '../jwtConfig';
import jwt from 'jsonwebtoken';
import passport from 'passport';

module.export = app => {
    app.get('/view_userdetails', (req, res, next) => {
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
                            username: user.username
                        }
                    }).then(user => {
                        const token = jwt.sign({ id: user.username }, jwtSecrete.secret);
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