import HttpNode = require('http');

import BaseRequestProcess = require('./BaseRequestProcess');

class RoutedRequestProcess extends BaseRequestProcess {

    constructor(next: BaseRequestProcess, condition: boolean) {
        super(next, condition);
    }

    public ProcessSpecification(request: HttpNode.IncomingMessage, response: HttpNode.ServerResponse): void {
        
    }
}

export = RoutedRequestProcess;
