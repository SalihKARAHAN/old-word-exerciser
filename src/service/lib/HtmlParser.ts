import Page = require('./Page');

class HtmlParser{
    ParseHtml(rawHtml:string):Page{
        let page:Page = new Page();
        return page;
    }
}

export = HtmlParser;
