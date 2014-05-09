var a = document.querySelectorAll('td:nth-child(3)');
var x = 0,
    f = [];
Array.prototype.forEach.call(a, function(b) {
    var c = b.querySelectorAll('p.MsoNormal');
    var e = [];
    Array.prototype.forEach.call(c, function(d) {
        var d = d.textContent;
        d = d.replace(/(^\s|\n|\t|\s$)/g, '').replace(/\s\s/, ' ')
        if (d !== "") e.push(d);
        // console.log(d)
    });
    setTimeout(function() {
        f.push(e)
    }, 300);
});