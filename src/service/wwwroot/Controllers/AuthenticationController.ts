import Controller = require('../../lib/Controller');
import IResult = require('../../lib/Result/IResult');
import ViewResult = require('../../lib/Result/ViewResult');

class AuthenticationController extends Controller {

    public LoginView(): ViewResult {
        return super.View();
    }
    
}
