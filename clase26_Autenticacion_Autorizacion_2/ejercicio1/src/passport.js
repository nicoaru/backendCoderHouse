const passport =require("passport")
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const { googleClientID, googleClientSecret } = require('./config.js')

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
        done(null, user);
});

passport.use(new GoogleStrategy({
        clientID:googleClientID,
        clientSecret:googleClientSecret,
        callbackURL: "http://localhost:8080/google/callback",
        passReqToCallback: true
    },
    function(request, accessToken, refreshToken, profile, done) {
            return done(null, profile);
    }
));
