import HttpHelper = require('http');

//
abstract class BaseRequestProcess {
    
    public Resolve(request: HttpHelper.IncomingMessage, response: HttpHelper.ServerResponse): void {
        if (this.GetCondition()) {
            this.ProcessSpecification(request, response);
        }
    }

    protected abstract ProcessSpecification(request: HttpHelper.IncomingMessage, response: HttpHelper.ServerResponse): void;

    protected abstract 
}

export = BaseRequestProcess;
