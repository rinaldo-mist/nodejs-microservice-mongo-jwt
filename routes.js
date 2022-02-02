'use strict';

module.exports = function(app) {
    var userHandler = require('./api/user/userController.js');

    //userhandler routes
    
    //register
    app.route('/auth/register').post(userhandler.register);
    //login
    app.route('/auth/logged_in').post(userhandler.login);
    //log credential required
    app.route('/auth/logged_required').post(userhandler.logged_required);
    //delete
    app.route('/auth/delete_user').delete(userhandler.delete_user);
};