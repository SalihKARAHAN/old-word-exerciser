import {Method}  from './Enums/Http.Method';
import RouteTable = require('./RouteTable');

abstract class Router {

    private _routes: RouteTable = null;

    abstract RegisterCustomRoutes(): void;

    public AddRoute(name: string, targetUrl: string, nameOfController: string, nameOfAction: string, method: Method): void {
        this._routes.Add(name,targetUrl,nameOfController,nameOfAction,method);
    }
}

export = Router;
