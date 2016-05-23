import Router = require('./Router');

class HttpManager {
    private _router: Router = null;

    constructor(routeInfo:Router) {
        this._router = routeInfo;
    }

    Dispatch(request: any, response: any): void {
        console.log('dispatcher runned');
        let url = request.url;
        let methodType = request.method;
        let host = request.headers.host;
        console.log(url);
        console.log(methodType);
        console.log(host);
        // find method
        // how to find?
        // first looking request url
        // route table has include request url
        // is exist?
        //      if has exist execute defined action of controller
        //      else look to url and try to parse.
        //      else exception

        // authentication & authorization
        // before decorators
        // invoke action
        // after decorators
    }
}

export = HttpManager;
