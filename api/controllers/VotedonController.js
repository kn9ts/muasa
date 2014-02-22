/**
 * VotedonController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
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

module.exports = {

    loadContestants: function(req, res) {
        try {
            res.render('contest', {
                data: {
                    categories: req.session.CONTESTANTS,
                    student: req.signedCookies.muasaStudent //if student has logged in, add to data
                }
            });
            // console.log(req.signedCookies.muasaStudent);
        } catch (err) {
            console.log(err)
        }
    },

    /**
     * Action blueprints:
     *    `/votedon/castvote`
     */
    castvote: function(req, res) {
        //check if student is logged in
        res.json(req.params.all());
        // if (req.signedCookies.muasaStudent) {
        //     var student = req.signedCookies.muasaStudent
        //     //email - id - category
        //     try {
        //         Votingdb.create(req.params.all(), function votedSuccessfully(err, contestant) {
        //             if (user) {
        //                 //store the category the student has voted in
        //                 Votedon.create({
        //                     email: student.emailaddress,
        //                     id: student.id,
        //                     category: contestant.category //category student has voted
        //                 })
        //             }
        //         });
        //     } catch (err) {
        //         res.json({
        //             error: err
        //         })
        //     }
        // }
    },

    /**
     * Overrides for the settings in `config/controllers.js`
     * (specific to VotedonController)
     */
    _config: {}


};