const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');


//authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
},
async(req,email,password,done) =>{
    try{
        let user = await User.findOne({email:email})
        const oldPassword = user.validPassword(password);
        if(!user || !oldPassword){
            req.flash('error','Invalid Username/password');
            return done(null,false);
        }
        return done(null,user);

    }catch(error){
        {
            console.log(error)
            req.flash('error', error);
            return done(error);

    }
}
}));
//serialize the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
});

//deserialize the user from the key in the cookies
passport.deserializeUser(async(id,done)=>{
    
    try {
        let user = await User.findById(id)
        return done(null, user);
      } catch (error) {
        console.log('Error in finding user --> Passport');
        return done(error);
      }
    });
    //check for if user is authenticated or not
passport.checkAuthentication = (req, res, next) => {
    //if the user is signed in then pass on the request to the "next()"-->controller's action
    if (req.isAuthenticated()) {
      return next();
    }
    return res.redirect('/user/sign-in');
  }
  
  passport.setAuthenticatedUser = (req, res, next) => {
    if (req.isAuthenticated()) {
      //req.user contains the current signed in user's from the session cookie and
      // we are just sending this to the local for the views
      res.locals.user = req.user;
    }
    next();
  }
  
  module.exports = passport;

