import Application = require('../lib/Application');
import RouteConfig = require('./RouteConfig');

let application: Application = new Application();
let port = 19924;
application.RegisterRouter(new RouteConfig());

application.Start(port, function() {
    console.log(port + ' listening....');
});
