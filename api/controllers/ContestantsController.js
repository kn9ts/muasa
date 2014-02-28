/**
 * VotedonController
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

//May require underscore
var _ = require('underscore'),
    $ = require('jquery'),
    uc = _;

var promise = require('promised-io/promise');
Deferred = promise.Deferred; //will handle asychronous file flows

var ContestantsController = {

    load: function(req, res) {
        if (req.signedCookies.muasaStudent) {
            try {
                var fn = ContestantsController;
                var student = req.signedCookies.muasaStudent;
                var CONTESTANTS = req.session.CONTESTANTS || false;
                var IMAGES = req.session.IMAGES || false;
                var D = new Deferred();

                //Get if he has voted in any categories
                fn.votedfor(req, res, student).then(function(rs) {
                    //user's voted for data
                    var votedfor = rs.response;
                    var vfarray = [];

                    //get the categories abbreviations
                    var cats = _.pluck(votedfor, 'abbr'); // ['CBD', 'STOF']

                    //remove the ones he has voted for
                    var filteredcategories = _.reject(CONTESTANTS, function(con) {
                        return _.contains(cats, con.abbr);
                    });

                    var castedvotespercat = [];

                    //Get all the VOTES
                    Contestants.find().done(function getAllVotes(err, results) {
                        if (err) console.error(err);
                        if (results) {
                            //Count all the votes per category
                            castedvotespercat = _.countBy(results, function(c) {
                                return c.abbr;
                            });

                            // {
                            //     "category": "Consistent Best Dresser",
                            //     --------------   1CBD, 2CBD
                            //     "contestants": ["Abdi Mohammed", "Eva Mwende", "Vincent Celanga", "Christine Kiarie", "Alex Atingo", "Esther Kamanja", "Evans Ondera", "Christine Jeramani", "Kipruto Kirwa", "Simon Ngure", "Michael Kajwang", "Irene Kamau", "Emma Pendo", "Jean Sitati", "Moses Nkapinini", "Fiona Adongo", "Arun Sarvaiya", "Zara Farah", "Mable Kibore", "Njeri Thiga", "Helen Gathi", "Karen Daudi", "Carol Wangunyu", "John Mwangi", "Margret Otieno"],
                            //     "abbr": "CBD"
                            // }

                            votedfor = _.map(votedfor, function(cn) {
                                var cid = parseInt(cn.contestantid);
                                //filter the extract from filtered data for the correct contestant list
                                var cat = _.findWhere(_.filter(CONTESTANTS, function(c) {
                                    return c.abbr == cn.abbr;
                                }), {abbr: cn.abbr});

                                var votes = _.size(_.filter(results, function(re) {
                                    return re.contestantid == cn.contestantid;
                                }));

                                //extract the name of the contestant
                                var name = cat.contestants[cid - 1];
                                var xi = _.findWhere(IMAGES, {name: name})
                                var image = xi ? xi.image: '/images/gallery/10.jpg';

                                var votecountpercat = castedvotespercat[cn.abbr];

                                //percentage of the total votes the contestant as recieved from the total;
                                var pc = Math.floor((votes/votecountpercat) * 100);

                                //merge returned data
                                return _.extend(cn, {name: name, votes: votes, votecount: votecountpercat, inpercent: pc, image: image});
                            });


                            //add images to the category set
                            filteredcategories = _.map(filteredcategories, function(a, i) {
                                // {
                                //     "category": "Best Lecturer",
                                //     "contestants": ["Mbogo Authur Lincon", "Jane Kariuki", "Bernard Arum", "Douglas Nyakundi", "Dr. Kenenedy Ogola", "Dr. Kennedy Osoro", "Dr. Diana Opollo", "Gitonga Antony", "Dr wambua", "Waweru Njoroge", "Esther", "Kabiera", "Dr Owour", "Ann Kihanya", "Patrice Kioko"],
                                //     "abbr": "BL"
                                // }

                                var cnst = _.map(a.contestants, function(b, i) {
                                    var xi = _.findWhere(IMAGES, {name: b}); //return null if nothing is found
                                    image = xi ? xi.image: '/images/gallery/10.jpg';
                                    return {name: b, image: image};
                                });
                                // a.contestants = cnst;
                                return {category: a.category, contestants: cnst, abbr: a.abbr};
                            })

                            //finally render the results
                            // setTimeout(function() {
                            res.render('contest', {
                                data: {
                                    // images: IMAGES,
                                    categories: filteredcategories,
                                    category_votes: castedvotespercat,
                                    results: vfarray,
                                    votedcats: cats,
                                    votedfor: votedfor,
                                    student: student //if student has logged in, add to data
                                }
                            });
                            // }, 100);

                        }
                        
                    });

                });

                // console.log(req.signedCookies.muasaStudent);
            } catch (err) {
                console.log(err)
            }
        } else {
            res.redirect('/')
        }
    },

    //check Database
    checkDB: function(DB, params, callback) {
        DB.find(params, function(e, r) {
            if (e) console(e);
            if (r && r.length !== 0) {
                callback(r);
            } else {
                callback(false);
            }
        })
    },

    /**
     * Action blueprints:
     *    `/votedon/castvote`
     */
    castvote: function(req, res) {
        var fn = ContestantsController;
        //check if student is logged in
        // res.json(req.params.all());
        var student = req.signedCookies.muasaStudent
        try {

            /*
             * check has he voted in the cat before
             * if not then add his vote
             * then now store that he has now voted in this cat before
             *
             */

            fn.checkDB(Contestants, {
                studentemail: student.emailaddress,
                abbr: req.param('abbr')
            }, function(response) {
                if (!response) { //if nothing was found
                    // nothing was found, so log the vote
                    if (!req.param('studentemail')) return false;
                    Contestants.create(req.params.all()).done(function votedSuccessfully(err, contestant) {
                        if (err) console.log(err);
                        if (contestant) {
                            contestant.status = true;
                            res.json(contestant);
                        }
                    });
                    console.log("nothing was found.")
                } else {
                    console.log(response);
                    res.json({
                        status: false,
                        data: response
                    });
                }
            });
        } catch (err) {
            console.log(err);
        }
    },

    votedfor: function(req, res, student) {
        var D = new Deferred(); //Promise it wont hurt
        var fn = ContestantsController;

        try {
            //do the checkup and get the results back
            fn.checkDB(Contestants, {
                studentemail: student.emailaddress
                // abbr: req.param('abbr')
            }, function(response) {
                //if any results came back
                if (response) {
                    //get the categories voted for
                    var cats = _.uniq(_.pluck(response, 'abbr')); // [MF, VP, CBD]
                    var pick = _.pick(response, 'abbr', 'category'); // [{abbr: 'MVP'}]
                    //get the contestants stored in the sessions
                    var CONTESTANTS = req.session.CONTESTANTS || false;
                    if (CONTESTANTS) {
                        //these are the categories that he dint vote for
                        var notvoted = _.reject(CONTESTANTS, function(a) {
                            return _.contains(cats, a.abbr) == true;
                        })
                        //respond to the user
                        D.resolve({
                            param: "Categories voted for",
                            categories: pick,
                            response: response,
                            nv: notvoted
                        });
                    } else {
                        //could not get contestants
                        D.resolve({
                            error: 1,
                            message: "session failed to pass the contestants."
                        })
                        console.log("session failed to pass the contestants.");
                    }
                } else {
                    D.resolve({
                        error: 2,
                        message: "Failed to retrieve results."
                    })
                }
            })
        } catch (err) {
            console.log(err);
        }

        return D.promise;
    },

    uservotedfor: function(req, res) {
        var fn = ContestantsController;
        var student = req.signedCookies.muasaStudent
        //Query for this user's data
        fn.votedfor(req, res, student).then(function(response) {
            res.json(response);
        });
    },

    all: function(req, res) {
        var CONTESTANTS = req.session.CONTESTANTS || false;
        // var D = new Deferred();
        Contestants.find().done(function(err, results) {
            var con = _.uniq(_.pluck(results, 'contestantid')); // [MF, VP, CBD]
            var orderedres = _.map(con, function(id, key) {
                var cn = {}
                cn.contestant = id;
                cn.arrayCount = _.filter(results, function(a) {
                    return id == a.contestantid;
                })

                // cn.arrayCount = _.pluck(cn.arrayCount, 'studentemail');
                //_.map(cn.arrayCount, function(obj) {
                //     return _.pick(obj, 'id', 'studentemail');
                // })
                cn.totalvotes = cn.arrayCount.length;

                // var CON = _.map(CONTESTANTS, function(e) {
                //     return _.pick(e, 'contestants', 'abbr');
                // })
                // cn.con = CON;

                return cn;
            })
            res.json(orderedres);
        });
    },

    destroyall: function(req, res) {
        Contestants.find({
            studentemail: req.signedCookies.muasaStudent.emailaddress
        }, function(err, rs) {})
    },

    /**
     * Overrides for the settings in `config/controllers.js`
     * (specific to VotedonController)
     */
    _config: {}

};

module.exports = ContestantsController;