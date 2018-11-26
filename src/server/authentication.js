const urls = {
    "SSOurl": "https://node-sso.herokuapp.com",
    "devSSOurl": "http://localhost:64444"
};

// ------------------ STEP - 1 (For SSO) ------------------------------------
// The user accesses the protected resource of system - "sso-consumer". 
// "sso-consumer" finds that the user is not logged in, jumps to the "sso-server",
// using his own address as a parameter.
// Below is the express.js middleware used to check the authenticaticity of a request.

const Authentication = function(req, res, next) {
    // simple check to see if user is authenticated or not
    // if not redirect to SSO server for login
    // pass the current url as redirect url
    // callbackURL is where sso should redirect in case of a valid user
    
    const redirectURL = `${req.protocol}://${req.headers.host}${req.path}`;
    if(req.session.user == null) {
        if(process.env.ENVIRONMENT == "DEVELOPMENT") {
            return res.redirect(`${urls.devSSOurl}?callbackURL=${redirectURL}`);
        } else
            return res.redirect(`${urls.SSOurl}?callbackURL=${redirectURL}`);
    }
    next();
}

module.exports = Authentication;