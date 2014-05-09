$('.vote-for-contestant').click(function(event) {
    // event.preventDefault();
    var el = $(this);
    var data = el.data();
    console.log(data);
    $.post('/votedon/castvote', data, function() {
        //do nothing
    }, 'json').done(function(response) {
        //Do something
    })
    return false;
});