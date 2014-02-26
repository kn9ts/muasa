/**
 * All Contestatnts
 *
 * @id -- their indexing in the arrays
 * @module      :: Policy
 * @description :: CONTESTANTS listing
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
module.exports = function(req, res, next) {
    var CONTESTANTS = [{
        "category": "Best Lecturer",
        "contestants": ["Mbogo Lincon", "Jane Kariuki", "Bernard Arum", "Douglas Nyakundi", "Dr. Kenenedy Ogola", "Dr. Kennedy Osoro", "Dr. Diana Opollo", "Gitonga Antony", "Judy Gakenia", "Dr wambua", "Lincoln Authur Mbogo", "Waweru Njoroge", "Esther", "Kabiera", "Dr Owour", "Ann Kihanya", "Patrice Kioko", "Kinyua", "Paul Sang"],
        "abbr": "BL"
    }, {
        "category": "Consistent Best Dresser",
        "contestants": ["Abdi Mohammed", "Eva Mwende", "Vincent Celanga", "Christine Kiarie", "Alex Atingo", "Esther Kamanja", "Evans Ondera", "Christine Jeramani", "Kipruto Kirwa", "Simon Ngure", "Michael Kajwang", "Irene Kamau", "Emma Pendo", "Jean Sitati", "Moses Nkapinini", "Fiona Adongo", "Arun Sarvaiya", "Zara Farah", "Mable Kibore", "Njeri Thiga", "Helen Gathi", "Karen Daudi", "Carol Wangunyu", "John Mwangi", "Margret Otieno"],
        "abbr": "CBD"
    }, {
        "category": "Most Popular",
        "contestants": ["Judy Kimani", "Alex Atingo", "John Mwangi", "Patrick Wandera", "David Ongola", "Bedel Silali", "Anita Onduko", "Simon Kiplagat", "Obengele Charles", "Regina Matiru", "David Ndunge", "John Mwangi", "Hazrat Ali", "Maina Karuiru", "Jakom", "Teresia Kamuga", "Martin Akuku", "David Ongola", "Asha Mwingi", "Helen Wekesa", "Nelson Jeremy", "Ezra Boniface makenzie", "Kadima James"],
        "abbr": "MP"
    }, {
        "category": "MUA Staff",
        "contestants": ["Rosemary Ogubala Apiyo", "Edwina Kerubo", "Miriam Wanjiru", "Evans Oyugi", "Faiza Ahmed Abdalla", "Anthony Kangethe", "Esther Wanaina", "Judy Ngayu", "Dinah Kabura", "Kevin Nderitu", "Lynette Mwende", "Steve Gachugu", "Diana Kibare", "Solomon Kimani", "Belinda Nzula"],
        "abbr": "MUAS"
    }, {
        "category": "Sports Person",
        "contestants": ["Norah Mwanamake", "James Gitonga", "Obengele", "Stanley Mwangi", "Omar ", "Eunice", "Keziah Munyao", "Jeremy Nelson", "Salad Ahmed"],
        "abbr": "SP"
    }, {
        "category": "Best Department",
        "contestants": ["Library", "Dean of Students", "Finance", "Admissionsion", "ICT"],
        "abbr": "BD"
    }]

    if (!req.session.CONTESTANTS) req.session.CONTESTANTS = CONTESTANTS;
    // console.info(req.session.CONTESTANTS[0]);
    next();
};