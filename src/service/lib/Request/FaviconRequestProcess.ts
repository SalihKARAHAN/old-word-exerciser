import HttpNode = require('http');

import BaseRequestProcess = require('./BaseRequestProcess');

class FaviconRequestProcess extends BaseRequestProcess {

    constructor() {
        super('/favicon.ico');
    }

    public ProcessSpecification(request: HttpNode.IncomingMessage, response: HttpNode.ServerResponse): void {

    }
}

export = ImageRequestProcess;
