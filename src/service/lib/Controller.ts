import IResult = require('./Result/IResult');
import ViewResult = require('./Result/ViewResult');

class Controller{

    public View(viewPath?:string):IResult;
    public View(controllerName:string, actionName:string):IResult;

    public View(viewPathOrControllerName:string, actionName?:string):IResult{
            let result:ViewResult = new ViewResult();
            return result;
    }

    Json():any{

    }

    //return View
    //return Json
    //return Redirect
}

export = Controller;
