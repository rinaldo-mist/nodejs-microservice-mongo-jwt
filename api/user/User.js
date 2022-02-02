'use strict';

const mongoose = require('mongoose'),
        bcrypt = require('bcrypt'),
        Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, required: true},
    email: { type: String, required: true},
    hash_pswd: { type: String, required: true},
    dtCreated: { type: Date, default: Date.now()},
    dtModified: { type: Date, default: Date.now()},
    status: { type: Integer, required: true}, //ACTIVE or INACTIVE -> active or deleted
    role: { type: String, required: true}, //ADMIN or REG -> admin or regular user
});

//hashing pass
UserSchema.methods.getpass = function (password) {
    return bcrypt.compareSync(password, this.hash_pswd);
}

module.exports = mongoose.model("user", UserSchema);