module.exports = async function (req, res, next) {
    if (req.session.user && (req.session.user.role == "admin")) { 
    return next();}
    else{
        res.flash('danger','You are not Authorised as Admin');
        return res.redirect('/auth/login');
    }
  };