import IResult = require('./Result/IResult');
import HtmlResult = require('./Result/HtmlResult');

class Controller{

    public Html(viewPath?:string):HtmlResult;
    public Html(controllerName:string, actionName:string):HtmlResult;

    public Html(viewPathOrControllerName:string, actionName?:string):HtmlResult{
            let result:HtmlResult = new HtmlResult();
            return result;
    }

    Json():any{

    }

    //return View
    //return Json
    //return Redirect
}

export = Controller;
