import RequestContext = require('./RequestContext');
import {Method}  from './Http.Method';
import Router = require('./Router');
import RouteData = require('./RouteData');
import {RouteCanNotFindException} from './Exception/RouteCanNotFindException';
import IResult = require('./Result/IResult');

class HttpManager {
    private _router: Router = null;
    constructor(router: Router) {
        this._router = router;
        global.router = this._router;
    }

    Dispatch(request: any, response: any): void {
        // FIXME: this._router sadece start anında oluşuyor ve dispose oluyor. Sonraki requestlerde this._router nesnesi undefined olarak geliyor. Yani her request için sadece Dispatch metodu invoke ediliyor. Burada da her seferinde yeniden route configi okumak biraz mantıksız bir işlem fakat şuan için yapabilecel başka bir şey yok gibi. Dispatch her çalıştığında route bilgilerini yeniden okumalı.
        // Çünkü Dispatch çalıştığında Server içerisinde çalışıyor. HttpManager sınıfını göremiyor.

        let url: string = request.url;
        let methodType: string = request.method;
        let host: string = request.headers.host;
        let requestContext: RequestContext = new RequestContext(url, methodType);

        console.log(url);
        console.log(methodType);
        console.log(host);
        // find method
        // how to find?
        // first looking request url

        let routeData: RouteData = global.router.GetRouteData(requestContext.GetUrl(), requestContext.GetMethodType());
        console.log('finded RouteData -> ', routeData);
        if (routeData == null) {
            throw new RouteCanNotFindException();
        }
        let path: string = '../wwwroot/Controllers/' + routeData.GetControllerName() + 'Controller';
        let currentController = require(path);
        // console.log('\nfinded controller -> ', currentController);
        // console.log('\nfinded new controller -> ', new currentController());
        // let HomeController = require('./HomesController');
        // console.log('\nfinded new controller.action -> ', new HomeController().Index);
        // console.log('\nfinded new controller<t>.action -> ', new currentController().Index);
        let controllerInstance = new currentController();
        console.log('\ncontrollerInstance -> ', controllerInstance);
        let actionName = routeData.GetActionName();
        console.log('\nactionName -> ', actionName);
        console.log('\ncontrollerInstance -> ', controllerInstance[actionName]);
        let action = controllerInstance[actionName];

        // TODO: how to access and get action arguments

        let result:IResult = action();
        console.log('result of executed action -> ', result);
        response.write(result._createdDate);
        response.statusCode = 200;
        response.end();
        // let action = currentController[routeData.GetActionName()];
        // route table has include request url
        // is exist?
        //      if has exist execute defined action of controller
        //      else look to url and try to parse.
        //      else exception

        // authentication & authorization
        // before decorators
        // invoke action
        // after decorators
        //
        //
    }
}

export = HttpManager;
