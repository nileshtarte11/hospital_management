const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const User = require('../model/user');

const db = require('../config');


router.post('/register', (req, res) => {
    let userData = req.body;
    let user = new User(userData);

    user.save((error, registeredUser) => {
        if (error) {
            console.log(error);
        }
        else {
            res.status(200).send(registeredUser);
        }
    })
})

router.post('/login', (req, res) => {
    let userData = req.body;
    User.findOne({ email: userData.email }, (error, user) => {

        if (error) {
            console.log(error);
        }
        else {
            if (!user) {
                res.status(401).send('Invalid Email');
            }
            else if (user.password !== userData.password) {
                res.status(401).send('Invalid Password');
            }
            else {
                let payload = { subject: user._id }
                let token = jwt.sign(payload, 'secretKey')

                res.status(200).send({ token, user });
            }
        }
    })
})

module.exports = router;