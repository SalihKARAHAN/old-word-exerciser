import HttpHelper = require('http');

abstract class BaseRequestProcess {
    private _next: BaseRequestProcess = null;
    private _condition: boolean = null;

    constructor(next:BaseRequestProcess, condition:boolean){
        this._next = next;
        this._condition = condition;
    }

    public Resolve(request: HttpHelper.IncomingMessage, response: HttpHelper.ServerResponse): void {
        if (this.GetCondition()) {
            this.ProcessSpecification(request, response);
        } else {
            this.Next(request, response);
        }
    }

    protected abstract ProcessSpecification(request: HttpHelper.IncomingMessage, response: HttpHelper.ServerResponse): void;

    private GetCondition(): boolean {
        return this._condition;
    }

    private Next(request: HttpHelper.IncomingMessage, response: HttpHelper.ServerResponse): void {
        this._next.Resolve(request, response);
    }
}

export = BaseRequestProcess;
