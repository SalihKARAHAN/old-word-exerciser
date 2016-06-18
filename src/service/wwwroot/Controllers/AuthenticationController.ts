import Controller = require('../../lib/Controller');
import IResult = require('../../lib/Result/IResult');
import HtmlResult = require('../../lib/Result/HtmlResult');
import JsonResult = require('../../lib/Result/JsonResult');

class AuthenticationController extends Controller {

    public LoginView(): HtmlResult {
        return super.Html();
    }

    public AuthenticateUser():JsonResult{
        return super.Json();
    }

    public RegisterUser():JsonResult{
        return super.Json();
    }

}

export = AuthenticationController;
