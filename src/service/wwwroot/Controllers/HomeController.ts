import IResult = require('../../lib/Result/IResult');
import HtmlResult = require('../../lib/Result/HtmlResult');
import Controller = require('../../lib/Controller');

class HomeController extends Controller{

    public Index():HtmlResult{
        return super.Html()
    }
}

export = HomeController;
