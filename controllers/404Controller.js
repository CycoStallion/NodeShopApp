pageNotFound = (req, res, next) => {
    res.status(404)
        .render('404', {activePath: '', pageTitle: 'Page Not Found'});
};

module.exports = pageNotFound;