import Controller = require('../../lib/Controller');
import IResult = require('../../lib/Result/IResult');
import ViewResult = require('../../lib/Result/ViewResult');
import JsonResult = require('../../lib/Result/JsonResult');

class AuthenticationController extends Controller {

    public LoginView(): ViewResult {
        return super.View();
    }

    public AuthenticateUser():JsonResult{
        return super.Json();
    }

    public RegisterUser():JsonResult{
        return super.Json();
    }

}

export = AuthenticationController;
