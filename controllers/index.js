exports.view = function(req, res) {
    var data = {
        'name': 'Hello GroupTyme!'
    };
    res.render('index', data);
}
