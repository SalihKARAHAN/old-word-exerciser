import RequestContext = require('./RequestContext');
import {Method}  from './Http.Method';
import Router = require('./Router');
import RouteData = require('./RouteData');
import {RouteCanNotFindException} from './Exception/RouteCanNotFindException';
import IResult = require('./Result/IResult');
import Constants = require('./Constants');
import RenderEngine = require('./RenderEngine');

class HttpManager {
    private _router: Router = null;
    constructor(router: Router) {
        this._router = router;
        global.router = this._router;
    }

    Dispatch(request: any, response: any): void {
        try {
            let url: string = request.url;
            let methodType: string = request.method;
            let host: string = request.headers.host;
            let requestContext: RequestContext = new RequestContext(url, methodType);
            // TODO: request validation?? content length, url, headers ...
            if (url !== '/favicon.ico') {

                console.log(url);
                console.log(methodType);
                console.log(host);
                // find method
                // how to find?
                // first looking request url

                let routeData: RouteData = global.router.GetRouteData(requestContext.GetUrl(), requestContext.GetMethodType());
                // console.log('finded RouteData -> ', routeData);
                if (routeData == null) {
                    throw new RouteCanNotFindException();
                }
                debugger;
                //   =====================       TEST AREA       =====================
                let path: string = '../wwwroot/Controllers/' + routeData.GetControllerName() + 'Controller';
                let currentController = require(path);
                // console.log('\nfinded controller -> ', currentController);
                // console.log('\nfinded new controller -> ', new currentController());
                // let HomeController = require('./HomesController');
                // console.log('\nfinded new controller.action -> ', new HomeController().Index);
                // console.log('\nfinded new controller<t>.action -> ', new currentController().Index);
                let controllerInstance = new currentController();
                // console.log('\ncontrollerInstance -> ', controllerInstance);
                let actionName = routeData.GetActionName();
                console.log('\nactionName -> ', actionName);
                // console.log('\ncontrollerInstance -> ', controllerInstance[actionName]);
                let action = controllerInstance[actionName];

                // TODO: how to access and get action arguments
                // TODO: how to access and get return type

                let result: IResult = action();
                console.log('result of executed action -> ', result);

                // TODO: buranın daha iyileştirilmesi gerekiyor.

                //console.log(__dirname);
                //console.log(__filename);

                let renderEngine = new RenderEngine();
                renderEngine.RenderResult(result);

                if (result.Name === Constants.Results.HTML) { // buradaki if yapısı için strategy pattern implementasyonu yapılabilir! Her resultun nasıl değerlendireleceği result'u değerlendiren yapının kendisinde olmalı!
                    console.log('Result = HTML!!')

                    // find view path;
                    let fileSystem = require('fs');
                    let pathManager = require('path');

                    let customPath = '../wwwroot/Contents/Views/' + routeData.GetControllerName() + '/' + routeData.GetActionName() + '.html';
                    console.log(customPath);

                    // TODO: file is exist on path
                    // TODO: content cache???
                    fileSystem.readFile(customPath, function(err, html) {
                        if (err) {
                            // TODO: require const declaration file for const values!!!
                            response.writeHeader(200, { "Content-Type": "text/html" });
                            response.write(err);
                            response.end();
                        }
                        response.writeHeader(200, { "Content-Type": "text/html" });
                        // burada okunan html dosyası içerisinde <{}> deklerasyonu var mı diye bakılmalı.
                        /* page obj deklerasyonu var ise bu deklerasyon parse edilmeli
                         *      1- bu deklerasyon için bir adet şemaya ihtiyaç var.
                         *      2- ilgili html dosyası içerisindeki deklerasyonları bulup şema nesnesine
                         *         aktaracak ve daha sonra gerekli komutları yerine getirecek bir iş sınıfına da ihtiyaç var
                         *      Örn:  Page.Layout deklerasyonuna rastlanıldığında ilgili sayfanın bir layout'a ait olduğ anlaşılmalı.
                         *            Her deklerasyon için bir komut bulunmalı ve deklerasyonları kullanmak için bu komutlar kullanılmalı.
                         *            Örneğin Layout komutu deklare edilen dizindeki html sayfasını okumalı ve bu sayfa içerisindeki body yazan
                         *            kısma bir önceki html dsyasındaki html değerleri eklenilmeli. Böyece template belirtebilme mümkün olmakta.
                         *
                        */
                        response.write(html);
                        response.end();
                    });
                }
                if (result.Name === 'JsonResult') {

                }

                // response.write(result.Name);
                // response.statusCode = 200;
                // response.end();
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
        } catch (error) {
            response.writeHeader(200, { "Content-Type": "text/html" });
            response.write(error);
            response.end();
        }
    }
}

export = HttpManager;
