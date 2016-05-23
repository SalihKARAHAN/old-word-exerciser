import {Method}  from './Enums/Http.Method';
import RouteTable = require('./RouteTable');

abstract class Router {

    private _routes: RouteTable = null;

    abstract RegisterCustomRoutes(_routes): void; // buraya route table'ı verelim, kullanıcı da implemente ettiğinde direk route table'a add get delete yapsın. Çünkü şuanki aşamada tüm bu işlemler router üzerinden ilerliyor ve mantıksızlık oluşturuyor.

    // TODO: needed target url customization

    public AddRoute(name: string, targetUrl: string, nameOfController: string, nameOfAction: string, method: Method): void {
        this._routes.Add(name,targetUrl,nameOfController,nameOfAction,method);
    }
}

export = Router;
