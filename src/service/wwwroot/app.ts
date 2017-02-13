import Application = require('../lib/Application');
import RouteConfig = require('./RouteConfig');

let application: Application = new Application();
let ip = '0.0.0.0';
let port = 8080;
application.RegisterRouter(new RouteConfig());

application.Start(port, function() {
    console.log(port + ' listening....');
});
