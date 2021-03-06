/**
 * StudentController
 *
 * @module      :: Controller
 * @description :: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

var bcrypt = require('bcrypt');

module.exports = {

    //checks if the user is logged in and redirects to appropriate link
    index: function(req, res) {
        if (req.signedCookies.muasaStudent) {
            res.redirect('/contest');
        } else {
            res.redirect('/hello');
        }
    },

    /**
     * Action blueprints:
     *    `/student/signup`
     */
    signup: function(req, res, next) {
        Student.create(req.params.all(), function createStudent(err, student) {
            if (err) res.json(err);
            //Student has been created, redirect back so as they can login
            else {
                req.session.SIGNEDUP = true;
                res.redirect('/');
            }
            // res.json(req.params.all());
        });
    },


    /**
     * Action blueprints:
     *    `/student/login`
     */
    login: function(req, res, next) {
        var p = req.params.all();
        console.log(p);

        Student.findOne({
            emailaddress: p.emailaddress
        }).done(function foundStudent(err, student) {
            if (err)
                res.json({
                    status: 500,
                    hello: 'Oops! Not sure, what happened. We are as shocked as you are.'
                });

            //on successful studen retrival
            if (student) {
                //Validate user password
                bcrypt.compare(p.encryptedPassword, student.encryptedPassword, function(err, isEqual) {
                    if (err) return next(err);
                    if (isEqual) { //is the password validly equal to its encrypted version
                        // res == true
                        res.cookie('muasaStudent', student, {
                            maxAge: new Date(Date.now() + 6048000),
                            httpOnly: true,
                            signed: true
                        });
                        res.redirect('/');
                    } else {
                        res.json({
                            account: student.emailaddress,
                            passwordValid: isEqual
                        });
                    }
                });
            } else res.json({
                status: 404,
                hello: 'We have no records of such an account in our database.',
                data: p
            });
        });
    },


    /**
     * Action blueprints:
     *    `/student/logout`
     */
    logout: function(req, res) {
        //do something
        res.clearCookie('muasaStudent');
        res.redirect('/');
    },

    delete: function(req, res, next) {
        Student.destroy({
            emailaddress: req.signedCookie.muasaStudent.emailaddress
        }).done(function(err) {
            if (err) return next(err);
            console.log("DB destroyed", req.params.all());
        });
    },

    cookies: function(req, res) {
        res.json({
            others: req.cookies,
            signed: req.signedCookies,
            session: req.session.muasaStudent || false
        })
    },

    /**
     * Overrides for the settings in `config/controllers.js`
     * (specific to StudentController)
     */
    _config: {}

};