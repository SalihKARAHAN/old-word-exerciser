import http = require('http');
import httpManager = require('./HttpManager');
import Router = require('./Router');

const _wwwRoot:string='';

class Application {

    private _routeInfo: Router = null;

    constructor() {

    }

    public Start(port: number, callback: any): void {
        let manager = new httpManager(this._routeInfo);
        let server = http.createServer(manager.Dispatch);
        server.listen(port, callback);
    }

    public RegisterRouter(router: Router): void {
        this._routeInfo = router;
    }
}

export = Application;
