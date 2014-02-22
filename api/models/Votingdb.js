/**
 * Votingdb
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

var VoteDB = {
    attributes: {
        id: {
            type: "integer", //the contestant's ID or NO 
            required: true
        },
        abbr: {
            type: "string",
            required: true
        },
        category: {
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

module.exports = VoteDB;