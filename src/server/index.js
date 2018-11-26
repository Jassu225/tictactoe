const path = require("path");
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
// const util = require("util");
const NedbStore = require('nedb-session-store')(session);
const cookieParser = require('cookie-parser');
const app = express();
const config = require('./config');
const routes = require('./routes');
const Authentication = require("./authentication");
const { thinkNextMove, resetVars } = require('./nextMove');
const port = process.env.PORT || config.port;
const sharedSecretKey = "3d8700d44aeeb29892a6a30c5ee78e08";

let sessionCookie = {
    cookie: {
        secure: false
    },
    secret: sharedSecretKey,
    resave: true,
    saveUninitialized: true,
    store: new NedbStore({
        filename: path.join(__dirname, "../../data/dataStore.db")
    })
}

// if (app.get('env') === 'production') {
//     app.set('trust proxy', 1) // trust first proxy
//     sessionCookie.cookie.secure = true // serve secure cookies
// }
// console.log(__dirname);
app.use(cookieParser(sharedSecretKey));
app.use(session(sessionCookie));
// app.use(Authentication);
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use("/css/",express.static(path.join(__dirname, "../client","/css")));
app.use("/js/",express.static(path.join(__dirname, "../client", "/js")));

// function resetGameState(req) {
//     req.session.gameState = [["","",""],["","",""],["","",""]];
//     req.session.save();
// }
// GET Methods
app.get(routes.root, function(req, res) { 
    // init session cookie
    // resetGameState(req);
    // send root
    res.sendFile(path.join(__dirname, "../client", "/html/index.html"));
});

// POST Methods
app.post(routes.root, function (req, res) {
    res.sendStatus(403);
});

app.post(routes.resetGameState, function(req, res) {
    // resetGameState(req);
    resetVars();
    res.send("Game state has been reset");
})

app.post(routes.getNextMove, function(req, res) {
    let data = req.body;
    // console.log(util.inspect(data));
    // console.log(util.inspect(req.session));
    res.send({
        nextMove: thinkNextMove(req)
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));