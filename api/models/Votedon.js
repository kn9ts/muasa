/**
 * Votedon
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

var CategoriesVotedFor = {
    attributes: {
        email: {
            type: "string",
            required: true
        },
        idno: {
            type: "string",
            required: true
        },
        category: {
            type: "string",
            required: true
        }
    }
};

module.exports = CategoriesVotedFor;