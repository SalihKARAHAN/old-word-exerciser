import {Method}  from './Http.Method';
import RouteTable = require('./RouteTable');
import RouteData = require('./RouteData');

abstract class Router {

    private _routes: RouteTable = null;

    constructor(){
        this._routes = new RouteTable();
        this.RegisterCustomRoutes(this._routes);
    }

    abstract RegisterCustomRoutes(routes: RouteTable): void; // buraya route table'ı verelim, kullanıcı da implemente ettiğinde direk route table'a add get delete yapsın. Çünkü şuanki aşamada tüm bu işlemler router üzerinden ilerliyor ve mantıksızlık oluşturuyor.

    public GetRouteData(url: string, method: Method): RouteData {
        return this._routes.GetRouteData(url, method);
    }
}

export = Router;
