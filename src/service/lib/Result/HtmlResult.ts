import Constants = require('../Constants');
import IResult = require('./IResult');

class HtmlResult implements IResult {
    public Name: string = null;
    public Content: string = null;

    constructor() {
        this.Name = Constants.Results.HTML;
    }

    public GetContent(): string {
        return this.Content;
    }

    public SetContent(content: string): void {
        this.Content = content;
    }
}

export = HtmlResult;
