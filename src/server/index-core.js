const http =  require('http');

const config = require('./config');
const routes = require('./routes');
let requestHandler = require('./requsetHandler');

http.createServer(function (req, res) {

    if(req.method == 'GET') {   // GET reqquests
        switch(req.url) {
            
        }
    } else {    // POST requests
        switch(req.url) {
            
        }
    }
}).listen(config.port, () => {
    console.log(`Server is running on http://localhost:${config.port}`);
}); 