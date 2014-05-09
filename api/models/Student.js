/**
 * Student
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

var bcrypt = require('bcrypt');

var Student = {
    attributes: {
        fullnames: {
            type: 'string',
            required: true,
            regex: /^[\w]+(\s)[\w]+(\s)?[\w]+?$/
        },

        idno: {
            type: 'string',
            required: true
        },

        phonenumber: {
            type: 'string',
            required: true,
            regex: /^(\+)?(254|0)[\d]{6,}$/,
            minLength: 10
        },

        emailaddress: {
            type: 'string',
            email: true,
            required: true,
            unique: true
        },

        encryptedPassword: {
            type: 'string',
            required: true
        },

        // hide password in response to client
        toJSON: function() {
            var obj = this.toObject();
            // delete obj.encryptedPassword;
            return obj;
        }
    },

    // Encrypte password before saving to the database
    beforeCreate: function(values, next) {
        bcrypt.hash(values.encryptedPassword, 10, function(err, hash) {
            if (err) return next(err);
            values.encryptedPassword = hash;
            next();
        });
    }
};

//add student module to app
module.exports = Student;