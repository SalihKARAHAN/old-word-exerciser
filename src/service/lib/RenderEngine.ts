import Page = require('./Page');
import Parser = require('./HtmlParser');
import IResult = require('./Result/IResult');
import IIO = require('./IIO');
import DiscIO = require('./DiscIO');

class RenderEngine {
    private _parser: Parser;

    /**
     *
     */
    constructor() {
        this._parser = new Parser();
    }

    public RenderResult(result: IResult, processEndCallback:any): void {
        let htmlOutput: string = null;
        let hasDefination: boolean = this.HasLayoutDefination(result);

        // console.log('Clean HTML out of methot= ', result.Content);
        if (hasDefination) {
            let io: IIO = new DiscIO();
            let layoutPath: string = '../wwwroot/Contents/Views/Templates/Page.Layout.html';
            // TODO: check layoout is exist on the path!

            io.Read(layoutPath, 'utf8', function(text) {
                let layout: string = text;
                layout = layout.replace(/<{[a-zA-Z.:'~\/()\s]+}>/g, result.Content);
                // // console.log('Merged Page= ', layout);
                // result.Content = layout;
                result.Content = layout;

                if (processEndCallback) {
                    processEndCallback(result);
                }
            },function () {

            });
        } else {

        }
        // console.log('hasDefination', hasDefination);
        /**
         * look this content, layout decleration is exist?
         * 		yes:   run layout is exist on defined path or default
         * 			yes:    read layout file
         * 					find <{Page.Body.Render()}> decleration
         * 					if Page.Body.Render not defined throw exception!!!
         * 					replace this decleration with result.Content and delete layout decleration
         */
    }

    private RegisterEngines():void{

    }
    public Layout(layoutPath: string): void {
        //check the layout exist in the path?
        let isExist: boolean = this.IsLayoutExist(layoutPath);

        // if (isExist) {
        //  read the layout file
        //}
        if (isExist) {
            let rawHtmlString: string;// read file
            let page: Page = this._parser.ParseHtml(rawHtmlString);
            // içi dolu deklerasyonlara ait komut fonksiyonlarını otomatik olarak bulacak ve execute edebilecek ayrı bir sisteme ihtiyaç bulunuyor.
        }
    }

    /**
     * [HasLayoutDefination description]
     * @param  {string}  contetn [description]
     * @return {boolean}         [description]
     */
    private HasLayoutDefination(result: IResult): boolean {
        let hasDefination: boolean = false;
        let regexResult = result.Content.match(/<{[a-zA-Z.:'~\/\s]+}>/g);
        let layoutDefination: string = regexResult[0];

        if (layoutDefination.indexOf('Page.Layout:')) {
            hasDefination = true;
        }
        // console.log('Layout definition= ', layoutDefination);

        // TODO: şimdilik buradan siliyorum normalde bunu Getayout(...) metodunun yapıyor olması lazım!
        result.Content = result.Content.replace(layoutDefination, '');
        // console.log('Clean HTML first removed= ', result.Content)

        return hasDefination;
    }

    private GetLayoutContent(): void {

    }


    private IsLayoutExist(path: string): boolean {
        let result = false;

        return result;
    }
}

export = RenderEngine;
