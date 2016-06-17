import Page = require('./Page');
import Parser = require('./HtmlParser');
import IResult = require('./Result/IResult');

class RenderEngine{
    private _parser:Parser;

    /**
     *
     */
    constructor() {
        this._parser = new Parser();
    }

    public RenderResult(result:IResult):string{
        let htmlOutput: string = null;

        /**
         * look this content, layout decleration is exist?
         * 		yes:   run layout is exist on defined path or default
         * 			yes:    read layout file
         * 					find <{Page.Body.Render()}> decleration
         * 					if Page.Body.Render not defined throw exception!!!
         * 					replace this decleration with result.Content and delete layout decleration
         */
        return htmlOutput;
    }

    private RegisterEngines():void{

    }

    private Layout(layoutPath:string):void{
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
