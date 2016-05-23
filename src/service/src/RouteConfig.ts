import {Method}  from '../lib/Enums/Http.Method';
import Router = require('../lib/Router');

class RouteConfig extends Router {
    RegisterCustomRoutes(): void {
        super.AddRoute("HomePage", "/", "Home", "Index", Method.Get);
        //...
    }
}

export = RouteConfig;
