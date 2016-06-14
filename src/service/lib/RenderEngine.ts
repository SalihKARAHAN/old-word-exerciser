import Page = require('./Page');
import Parser = require('./HtmlParser');


class RenderEngine{
    private _parser:Parser;

    /**
     *
     */
    constructor() {
        this._parser = new Parser();
    }

    public Layout(layoutPath:string):void{
        //check the layout exist in the path?
        let isExist:boolean = this.IsLayoutExist(layoutPath);

        // if (isExist) {
        //  read the layout file
        //}
        if (isExist) {
            let rawHtmlString:string;// read file
            let page:Page = this._parser.ParseHtml(rawHtmlString);
            // içi dolu deklerasyonlara ait komut fonksiyonlarını otomatik olarak bulacak ve execute edebilecek ayrı bir sisteme ihtiyaç bulunuyor.
        }
    }

    private IsLayoutExist(path:string):boolean{
        let result = false;

        return result;
    }
}

export = RenderEngine;
