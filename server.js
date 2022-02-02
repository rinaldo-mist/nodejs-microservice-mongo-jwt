'use strict';

var express = require('express'),
        app = express(),
        PORT = process.env.PORT || 8000,
        mongoose = require('mongoose'),
        routers = require('./routes.js'),
        User = require('./api/user/User.js'),
        bodyParser = require('body-parser'),
        jsonwebtoken = require('jsonwebtoken');

app.use(function(req, res, next) {
    if(req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
        jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'TESTRESTFULAPIs', function(err, decode){
            if(err) {
                req.user = undefined;
            }
            req.user = decode;
            next();
        });
    } else {
        req.user = undefined;;
        next();
    }
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function(req, res){
    res.send(routers());
});