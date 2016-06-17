import RequestContext = require('./RequestContext');
import {Method}  from './Http.Method';
import Router = require('./Router');
import RouteData = require('./RouteData');
import {RouteCanNotFindException} from './Exception/RouteCanNotFindException';
import IResult = require('./Result/IResult');
import Constants = require('./Constants');
import RenderEngine = require('./RenderEngine');
import IIO = require('./IIO');
import DiskIO = require('./DiskIO');


class HttpManager {
    private _router: Router = null;
    private _io: IIO = null;

    constructor(router: Router) {
        this._router = router;
        global.router = this._router;
        this._io = new DiskIO();
    }

    Dispatch(request: any, response: any): void {
        this._io = this._io || new DiskIO();

        try {
            let url: string = request.url;
            let methodType: string = request.method;
            let host: string = request.headers.host;
            let requestContext: RequestContext = new RequestContext(url, methodType);
            // TODO: request validation?? content length, url, headers ...

            /*
                css ve js workagound
             */
            // console.log(url.substr(1, 6))
            /*
            bu script style image page vb ayrımları kendi içlerinde yapılabilir
            bağpımsız yapılara dönüştürmem gerekiyor! TODO:  */

            let requestType: string = undefined;

            if (url.substr(1, 6) === 'Styles') {
                requestType = 'style';
                let afterPath = url.substr(7, url.length - 1);
                let rootPath = '../wwwroot/Contents/Styles' + afterPath;
                console.log('Target path for styles= ', rootPath); // adreste style yok ise null dönmeli 404 olarak!
                debugger;
                this._io.Read(rootPath, 'utf8', function(text) {
                    response.writeHeader(200, { 'Content-Type': 'text/css' });
                    // console.log('Css= ', text);
                    response.write(text);
                    response.end;
                });
            }

            if (url.substr(1, 7) === 'Scripts') {

            }



            if (url !== '/favicon.ico' && requestType === undefined) {

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
                // console.log('\nactionName -> ', actionName);
                // console.log('\ncontrollerInstance -> ', controllerInstance[actionName]);
                let action = controllerInstance[actionName];

                // TODO: how to access and get action arguments
                // TODO: how to access and get return type

                let result: IResult = action();
                console.log('result of executed action -> ', result);
                // TODO: buranın daha iyileştirilmesi gerekiyor.

                //console.log(__dirname);
                //console.log(__filename);

                if (result.Name === Constants.Results.HTML) { // buradaki if yapısı için strategy pattern implementasyonu yapılabilir! Her resultun nasıl değerlendireleceği result'u değerlendiren yapının kendisinde olmalı!
                    console.log('Result = HTML!!')

                    // find view path;
                    let pathManager = require('path');

                    let customPath = '../wwwroot/Contents/Views/' + routeData.GetControllerName() + '/' + routeData.GetActionName() + '.html';
                    console.log(customPath);

                    // TODO: file is exist on path
                    // TODO: content cache???
                    let io: IIO = new DiskIO();

                    io.Read(customPath, 'utf8', function(text) {
                        result.Content = text;
                        let renderEngine: RenderEngine = new RenderEngine();

                        renderEngine.RenderResult(result, function(renderedResult: IResult) {
                            response.writeHeader(200, { "Content-Type": "text/html" });
                            console.log('HTML= ', renderedResult.Content);
                            response.write(renderedResult.Content);
                            response.end();
                        });
                    });

                    // fileSystem.readFile(customPath, 'utf8', function(err, html) {
                    //     if (err) {
                    //         // TODO: require const declaration file for const values!!!
                    //         response.writeHeader(200, { "Content-Type": "text/html" });
                    //         response.write(err);
                    //         response.end();
                    //     }
                    //     response.writeHeader(200, { "Content-Type": "text/html" });
                    //     // burada okunan html dosyası içerisinde <{}> deklerasyonu var mı diye bakılmalı.
                    //     /* page obj deklerasyonu var ise bu deklerasyon parse edilmeli
                    //      *      1- bu deklerasyon için bir adet şemaya ihtiyaç var.
                    //      *      2- ilgili html dosyası içerisindeki deklerasyonları bulup şema nesnesine
                    //      *         aktaracak ve daha sonra gerekli komutları yerine getirecek bir iş sınıfına da ihtiyaç var
                    //      *      Örn:  Page.Layout deklerasyonuna rastlanıldığında ilgili sayfanın bir layout'a ait olduğ anlaşılmalı.
                    //      *            Her deklerasyon için bir komut bulunmalı ve deklerasyonları kullanmak için bu komutlar kullanılmalı.
                    //      *            Örneğin Layout komutu deklare edilen dizindeki html sayfasını okumalı ve bu sayfa içerisindeki body yazan
                    //      *            kısma bir önceki html dsyasındaki html değerleri eklenilmeli. Böyece template belirtebilme mümkün olmakta.
                    //      *
                    //     */
                    //
                    //     console.log(html);
                    //     result.Content = html;
                    //     console.log('Result.Content=', result.Content);
                    //
                    //
                    //     var renderEngine: RenderEngine = new RenderEngine();
                    //     renderEngine.RenderResult(result);
                    //     console.log('renderEngine')
                    //
                    // });
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

            }
        } catch (error) {
            response.writeHeader(200, { "Content-Type": "text/html" });
            response.write(error);
            response.end();
        }
    }
}

export = HttpManager;
