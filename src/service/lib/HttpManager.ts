import RequestContext = require('./RequestContext');
import {Method}  from './Http.Method';
import Router = require('./Router');
import RouteData = require('./RouteData');
import {RouteCanNotFindException} from './Exception/RouteCanNotFindException';
import IResult = require('./Result/IResult');
import Constants = require('./Constants');
import RenderEngine = require('./RenderEngine');
import RequestManager = require('./Request/RequestManager');

import IIO = require('./IIO');
import DiscIO = require('./DiscIO');

class HttpManager {
    private _router: Router = null;
    private _io: IIO = null;

    constructor(router: Router) {
        this._router = router;
        global.router = this._router;
    }

    Dispatch(request: any, response: any): void {
        this._io = this._io || new DiscIO();
        
        RequestManager requestManager = new RequestManager();
        requestManager.CreateResponseForRequest(request)
        

        try {
            let url: string = request.url;
            let methodType: string = request.method;
            let host: string = request.headers.host;
            let requestContext: RequestContext = new RequestContext(url, methodType);
            console.log('Request to -> ' + url);
            // TODO: request validation?? content length, url, headers ...

            /*
                css ve js workagound
             */
            // // console.log(url.substr(1, 6))
            /*
            bu script style image page vb ayrımları kendi içlerinde yapılabilir
            bağpımsız yapılara dönüştürmem gerekiyor! TODO:  */
            let requestType: string = undefined;

            if (url.substr(1, 6) === 'Styles') {
                console.log(__dirname);
                requestType = 'style';
                let afterPath = url.substr(7, url.length - 1);
                let rootPath = '../wwwroot/Contents/Styles' + afterPath;
                // console.log('Target path for styles= ', rootPath); // adreste style yok ise null dönmeli 404 olarak!
                debugger;
                this._io.Read(rootPath, 'utf8', function(text) {
                    response.writeHeader(200, { 'Content-Type': 'text/css; charset=utf8', 'transfer-encoding': 'gzip' });
                    // // console.log('Css= ', text);
                    debugger;
                    response.end(text, 'utf8');
                }, function() {
                    response.end();
                    console.log('Request complated in css');
                    return;
                });
            }
            if (url.substr(1, 7) === 'Scripts') {

            }
            if (url === '/favicon.ico') {
                response.end();
                return;
            }
            if (url !== '/favicon.ico' && requestType === undefined) {
                // find method
                // how to find?
                // first looking request url
                let routeData: RouteData = global.router.GetRouteData(requestContext.GetUrl(), requestContext.GetMethodType());
                if (routeData == null) {
                    throw new RouteCanNotFindException();
                }
                let path: string = '../wwwroot/Controllers/' + routeData.GetControllerName() + 'Controller';
                let currentController = require(path);
                let controllerInstance = new currentController();
                let actionName = routeData.GetActionName();
                let action = controllerInstance[actionName];
                // TODO: how to access and get action arguments
                // TODO: how to access and get return type
                let result: IResult = action();
                // TODO: buranın daha iyileştirilmesi gerekiyor.
                if (result.Name === Constants.Results.HTML) { // buradaki if yapısı için strategy pattern implementasyonu yapılabilir! Her resultun nasıl değerlendireleceği result'u değerlendiren yapının kendisinde olmalı!
                    // find view path;
                    let pathManager = require('path');

                    let customPath = '../wwwroot/Contents/Views/' + routeData.GetControllerName() + '/' + routeData.GetActionName() + '.html';
                    // TODO: file is exist on path
                    // TODO: content cache???
                    let io: IIO = new DiscIO();

                    io.Read(customPath, 'utf8', function(text) {
                        result.Content = text;
                        let renderEngine: RenderEngine = new RenderEngine();

                        renderEngine.RenderResult(result, function(renderedResult: IResult) {
                            response.writeHeader(200, { "Content-Type": "text/html; charset=utf8" });
                            response.write(renderedResult.Content);
                        });

                    }, function() {
                        response.end();
                        console.log('Request complated in html');
                    });
                }
                if (result.Name === 'JsonResult') {

                }
            }
        } catch (error) {
            response.writeHeader(200, { "Content-Type": "text/html" });
            response.write(error);
            response.end();
        }
    }
}

export = HttpManager;
