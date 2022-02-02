'use strict';

const mongoose = require('mongoose'),
        jwt = require('jsonwebtoken'),
        bcrypt = require('bcrypt'),
        User = mongoose.model('User');

exports.register = function (req, res) {
    let newUser = new User(req.body);
    newUser.hash_pswd = bcrypt.hashSync(req.body.password, 8);
    newUser.status = 1;
    newUser.save(function (err, user) {
        if (err) {
            return res.status(400).send({message : err});
        } else {
            user.hash_pswd = undefined;
            return res.json(user);
        }
    });
};

exports.logged_in = function (req, res) {
    User.findOne({
        email: req.body.email
    }, function (err, user) {
        //error exists
        if (err) throw err;
        //no user
        if (!user) {
            res.status(403).json({message : 'Authentication failed. No user found.'});
        } else if (user) {
            //wrong password
            if(!user.getpass(req.body.password)) {
                res.status(403).json({message : 'Authentication failed. Wrong password.'});
            } else {
                if(user.role != 'admin') {
                    res.status(403).json({message : 'Can\'t display details. Lack of credential'});
                } else {
                    return res.json({token : jwt.sign({
                        email : user.email,
                        username : user.username,
                        status : user.status,
                        _id : user._id,
                    }, 'TESTRESTFULAPIs')});
                }
            }
        }
    });
};

exports.logged_required = function (req, res, next) {
    if (req.user) {
        next();
    } else {
        res.status(403).json({message: 'Not enough credential !'});
    }
};

exports.delete_user = function (req, res) {
    User.findOne({
        email: req.body.email
    }, function (err, user) {
        //error exists
        if (err) throw err;
        //no user
        if (!user) {
            res.status(403).json({message : 'No user found.'});
        } else if (user) {
            if(user.role != 'admin' && user.email != req.body.email) {
                res.status(403).json({message : 'Can\'t display details. Lack of credential'});
            } else {
                User.findByIdAndUpdate({_id: user._id}, req.body, function (err, user) {
                    if (err){
                        res.send(err);
                    }
                    return res.json({username : user.username, status: 0});
                });
            }
        }
    });
};