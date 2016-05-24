import IResult = require('./IResult');

class ViewResult implements IResult {
    public _createdDate:string=null;

    constructor(){
        this._createdDate = new Date().toDateString();
    }
}

export = ViewResult;
