'use strict';

module.exports = function(app) {
    var userHandler = require('./api/user/userController.js');

    //userhandler routes
    
    //register
    app.route('/auth/register').post(userhandler.register);
    //login
    app.route('/auth/logged_in').get(userhandler.login);
    //log credential required
    app.route('/auth/logged_required').get(userhandler.logged_required);
    //delete
    app.route('/auth/delete_user').post(userhandler.delete_user);
};