module.exports.homePage = (req, res) => {
    return res.render('home', {
        title: 'Home | Page'
    });
}