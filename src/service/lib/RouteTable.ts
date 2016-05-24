import {Method}  from './Http.Method';
import RouteData = require('./RouteData');

class RouteTable {
    private _routeInfo: {};

    constructor() {
        this._routeInfo = {}
    }

    // TODO: needed target url customization
    public Add(name: string, targetUrl: string, nameOfController: string, nameOfAction: string, method: Method): void {
        let url: string = this._routeInfo[targetUrl];

        if (!url) {
            this._routeInfo[targetUrl] = new RouteData(name, targetUrl, nameOfController, nameOfAction, method);
        }
    }

    public Change(name: string, newTargetUrl: string, nameOfController: string, nameOfAction: string, method: Method): void {

    }

    public GetRouteData(url: string, methodType: Method): RouteData {
        let routeData: RouteData = this._routeInfo[url];
        return routeData;
    }
}

export = RouteTable;
