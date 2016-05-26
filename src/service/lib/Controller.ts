import IResult = require('./Result/IResult');
import ViewResult = require('./Result/ViewResult');

class Controller{

    public View(viewPath?:string):ViewResult;
    public View(controllerName:string, actionName:string):ViewResult;

    public View(viewPathOrControllerName:string, actionName?:string):ViewResult{
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
