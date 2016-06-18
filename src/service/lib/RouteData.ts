import {Method}  from './Http.Method';

class RouteData {
    private _name: string;
    private _url: string;
    private _controllerName: string;
    private _actionName: string;
    private _method: Method;

    constructor(name: string, url: string, controllerName: string, actionName: string, method: Method) {
        this._name = name;
        this._url = url;
        this._controllerName = controllerName;
        this._actionName = actionName;
        this._method = method;
    }

    public GetName():string{
        return this._name;
    }

    public GetUrl():string{
        return this._url;
    }

    public GetControllerName():string{
        return this._controllerName;
    }

    public GetActionName():string{
        return this._actionName;
    }

    public GetMethodType():Method{
        return this._method;
    }
}

export = RouteData;
