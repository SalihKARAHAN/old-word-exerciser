import IResult = require('../../lib/Result/IResult');
import ViewResult = require('../../lib/Result/ViewResult');
import Controller = require('../../lib/Controller');

class HomeController extends Controller{

    public Index():ViewResult{
        return super.View()
    }
}

export = HomeController;
