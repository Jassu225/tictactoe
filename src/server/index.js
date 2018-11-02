const path = require("path");
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const util = require("util");
const app = express();
const config = require('./config');
const routes = require('./routes');
const nextMove = require('./nextMove');
const port = process.env.PORT || config.port;

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

let sessionCookie = {
    cookie: {
        secure: false
    },
    secret: "secret key",
    resave: true,
    saveUninitialized: true
}

if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    sessionCookie.cookie.secure = true // serve secure cookies
}
// console.log(__dirname);
  
app.use(session(sessionCookie));
app.use("/css/",express.static(path.join(__dirname, "../client","/css")));
app.use("/js/",express.static(path.join(__dirname, "../client", "/js")));

function resetGameState(req) {
    req.session.gameState = [["","",""],["","",""],["","",""]];
    req.session.save();
}
// GET Methods
app.get(routes.root, function(req, res) { 
    // init session cookie
    resetGameState(req);
    // send root
    res.sendFile(path.join(__dirname, "../client", "/html/index.html"));
});

// POST Methods
app.post(routes.root, function (req, res) {
    res.sendStatus(403);
});

app.post(routes.resetGameState, function(req, res) {
    resetGameState(req);
    res.send("Game state has been reset");
})

app.post("/getNextMove", function(req, res) {
    let data = req.body;
    console.log(util.inspect(data));
    console.log(util.inspect(req.session));
    res.send({
        nextMove: nextMove(req)
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));