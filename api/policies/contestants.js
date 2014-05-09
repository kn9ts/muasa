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
        "contestants": ["Mbogo Authur Lincon", "Jane Kariuki", "Bernard Arum", "Douglas Nyakundi", "Dr. Kenenedy Ogola", "Dr. Kennedy Osoro", "Dr. Diana Opollo", "Gitonga Antony", "Dr wambua", "Waweru Njoroge", "Esther", "Kabiera", "Dr Owour", "Ann Kihanya", "Patrice Kioko"],
        "abbr": "BL"
    }, {
        "category": "Student of the Year",
        "contestants": ["Njeri Gatonye", "David Ongalo", "Meshack Mwakisagho", "Jeremiah Kapuwa", "Francis Kibuwe", "Charles Obengele", "Felista Mwangangi", "Ali Azrat", "Raphael Amuko", "Eric Mwangi", "Mnjala John", "Duncun Barkebo", "Eluid Muchai", "Keziah Munyao"],
        "abbr": "SOTY"
    }, {
        "category": "Consistent Best Dresser",
        "contestants": ["Abdi Mohammed", "Eva Mwende", "Vincent Celanga", "Christine Kiarie", "Alex Atingo", "Esther Kamanja", "Evans Ondera", "Christine Jeramani", "Kipruto Kirwa", "Simon Ngure", "Michael Kajwang", "Irene Kamau", "Emma Pendo", "Jean Sitati", "Moses Nkipilil", "Fiona Adongo", "Arun Sarvaiya", "Zara Farah", "Mable Kibore", "Njeri Thiga", "Helen Gathi", "Daudi Hajji", "Carol Wangunyu", "John Mwangi", "Margret Otieno"],
        "abbr": "CBD"
    }, {
        "category": "Most Popular",
        "contestants": ["Alex Atingo", "Keziah Munyao", "John Mwangi", "Patrick Wandera", "Bedel Silali", "Anita Onduko", "Simon Kiplagat", "Obengele Charles", "Regina Matiru", "David Ndunge", "John Mwangi", "Hazrat Ali", "Maina Karuiru", "Jakom", "Teresia Kamuga", "Martin Akuku", "David Ongola", "Asha Mwingi", "Helen Wekesa", "Nelson Jeremy", "Ezra Boniface makenzie", "Kadima James"],
        "abbr": "MP"
    }, {
        "category": "MUA Staff",
        "contestants": ["Rosemary Ogubala Apiyo", "Edwina Kerubo", "Miriam Wanjiru", "Evans Oyugi", "Faiza Ahmed Abdalla", "Anthony Kangethe", "Esther Wanaina", "Judy Ngayu", "Dinah Kabura", "Kevin Nderitu", "Lynette Mwende", "Steve Gachugu", "Diana Kibare", "Solomon Kimani", "Belinda Nzula"],
        "abbr": "MUAS"
    }, {
        "category": "Sports Person",
        "contestants": ["Norah Mwanake", "James Gitonga", "Charles Obengele", "Stanley Mwangi", "Omar Bashabra", "Eunice Nyabonyi", "Jeremy Nelson", "Salad Ahmed"],
        "abbr": "SP"
    }, {
        "category": "Best Department",
        "contestants": ["Library", "Car Wash", "Finance", "Admissionsion", "ICT"],
        "abbr": "BD"
    }]

    var IMAGES = [{
        name: "Dr Owour",
        image: '/images/gallery/1.jpg'
    }, {
        name: "Solomon Kimani",
        image: "/images/gallery/2.jpg"
    }, {
        name: "Steve Gachugu",
        image: "/images/gallery/3.jpg"
    }, {
        name: "Miriam Wanjiru",
        image: "/images/gallery/4.jpg"
    }, {
        name: "Edwina Kerubo",
        image: "/images/gallery/5.jpg"
    }, {
        name: "Antony Kangethe",
        image: "/images/gallery/6.jpg"
    }, {
        name: "Evans Oyugi",
        image: "/images/gallery/7.jpg"
    }, {
        name: "Esther Wanaina",
        image: "/images/gallery/11.jpg"
    }, {
        name: "Regina Matiru",
        image: "/images/gallery/8.jpg"
    }, {
        name: "Moses Nkapilil",
        image: "/images/gallery/12.jpg"
    }, {
        name: "Eunice Nyabonyi",
        image: "/images/gallery/13.jpg"
    }, {
        name: "Kevin Nderitu",
        image: "/images/gallery/17.jpg"
    }, {
        name: "Arun Sarvaiya",
        image: "/images/gallery/14.jpg"
    }, {
        name: "Hazrat Ali",
        image: "/images/gallery/15.jpg"
    }, {
        name: "Faiza Ahmed",
        image: "/images/gallery/16.jpg"
    }, {
        name: "Carol Wangunyu",
        image: "/images/gallery/19.jpg"
    }, {
        name: "Omar Bashabra",
        image: "/images/gallery/20.jpg"
    }, {
        name: "Keziah Munyao",
        image: "/images/gallery/21.jpg"
    }, {
        name: "Nelson Jeremy",
        image: "/images/gallery/22.jpg"
    }, {
        name: "Norah Mwanake",
        image: "/images/gallery/23.jpg"
    }, {
        name: "Alex Atingo",
        image: "/images/gallery/24.jpg"
    }, {
        name: "Everlyne Mwende",
        image: "/images/gallery/18.jpg"
    }, {
        name: "Jean Sitati",
        image: "/images/gallery/3-2.jpg"
    }, {
        name: "Daudi Hajji",
        image: "/images/gallery/2-2.jpg"
    }, {
        name: "Rosemary Ogubala Apiyo",
        image: "/images/gallery/1-2.jpg"
    }]

    if (!req.session.CONTESTANTS) req.session.CONTESTANTS = CONTESTANTS;
    if (!req.session.IMAGES) req.session.IMAGES = IMAGES;
    // console.info(req.session.CONTESTANTS[0]);
    next();
};