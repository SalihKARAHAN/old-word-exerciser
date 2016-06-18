import {Method} from './Http.Method';
import Router = require('./Router');

class RequestContext {

    private _targetUrl: string = null;
    private _methodType: Method = null;
    private _router: Router = null;

    constructor(url: string, method: string) {
        this._targetUrl = url;
        this._methodType = Method[method];
    }

    public GetUrl(): string {
        return this._targetUrl;
    }

    public GetMethodType(): Method {
        return this._methodType;
    }
}

export = RequestContext;
