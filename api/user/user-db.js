'use strict';

const mongoose = require('mongoose');

const MONGO_URI = "mongodb+srv://rootmongotest:rootmongotest@testcluster1.imcvk.mongodb.net/test";

const openMongoServer = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
           useNewUrlParser: true 
        });
        console.log("Connected to MongoDB");
    } catch (e) {
        console.log(e);
        throw e;
    }
};

module.exports = openMongoServer;