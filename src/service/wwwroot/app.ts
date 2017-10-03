import Application = require('../lib/Application');
import RouteConfig = require('./RouteConfig');

let application: Application = new Application();
let ip = '0.0.0.0'; //for c9.io environment
let port = 8080; //for c9.io environment
application.RegisterRouter(new RouteConfig());

application.Start(ip, port, function() {
    console.log(ip +':' + port + ' listening....');
});
