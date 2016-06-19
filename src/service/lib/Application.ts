import http = require('http');
import httpManager = require('./HttpManager');
import Router = require('./Router');
import RouteData = require('./RouteData');

const _wwwRoot: string = '';

class Application {

    private _router: Router = null;

    constructor() {

    }

    public Start(port: number, callback: any): void {
        let manager = new httpManager(this._router);
        let server = http.createServer(manager.Dispatch);
        server.listen(port, 'localhost', callback);
    }

    public RegisterRouter(router: Router): void {
        this._router = router;
        // console.log('Application._router -> ', this._router);
    }
}

export = Application;
