import HttpNode = require('http');

import BaseRequestProcess = require('./BaseRequestProcess');

class ImageRequestProcess extends BaseRequestProcess {

    constructor(next: BaseRequestProcess, condition: boolean) {
        super(next, condition);
    }

    public ProcessSpecification(request: HttpNode.IncomingMessage, response: HttpNode.ServerResponse): void {

    }
}

export = ImageRequestProcess;
