pageNotFound = (req, res, next) => {
    // res.status(404).send('<h1>Page not found</h1>');
    res.status(404)
        //.sendFile(path.join(__dirname, 'views', '404.html'));
        .render('404', {activePath: '', pageTitle: 'Page Not Found'});
};

module.exports = pageNotFound;