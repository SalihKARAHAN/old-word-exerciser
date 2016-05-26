import IResult = require('./IResult');

class ViewResult implements IResult {
    public Name: string = null;
    public Content: string = null;

    constructor() {
        this.Name = 'ViewResult';
    }

    public GetContent(): string {
        return this.Content;
    }

    public SetContent(content: string): void {
        this.Content = content;
    }
}

export = ViewResult;
