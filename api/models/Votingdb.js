/**
 * Votingdb
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

var VoteCountDB = {
    attributes: {
        studentIdno: {
            type: "string",
            required: true
        },
        studentEmail: {
            type: "email",
            required: true
        },
        id: {
            type: "integer", //the contestant's ID or NO 
            required: true
        },
        category: {
            type: "string",
            required: true
        }
    }
};

module.exports = VoteCountDB;