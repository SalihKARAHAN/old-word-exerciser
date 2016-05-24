import {Method}  from '../lib/Http.Method';
import RouteTable = require('../lib/RouteTable');
import Router = require('../lib/Router');

class RouteConfig extends Router {
    RegisterCustomRoutes(routes: RouteTable): void {
        routes.Add("HomePage", "/", "Home", "Index", Method.GET);
        routes.Add("LoginPage", "/Login", "Authentication", "LoginView", Method.GET);
    }
}

export = RouteConfig;
