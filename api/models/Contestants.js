/**
 * Votingdb
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

var ContestantsDB = {
    attributes: {
        contestantid: {
            type: "string", //the contestant's ID or NO 
            required: true
        },
        category: {
            type: "string",
            required: true
        },
        abbr: {
            type: "string",
            required: true
        },
        studentid: {
            type: "string", //student's id
            required: true
        },
        studentemail: {
            type: "email",
            required: true
        }
    }
};

module.exports = ContestantsDB;