import Constants = require('../Constants');
import IResult = require('./IResult');

class JsonResult implements IResult {
    public Name:string = null;
    public Content:string=null;

    constructor(){
        this.Name = Constants.Results.JSON;
    }

    public GetContent():string{
        return this.Content;
    }

    public SetContent(content:string):void{
        this.Content = content;
    }
}

export = JsonResult;
