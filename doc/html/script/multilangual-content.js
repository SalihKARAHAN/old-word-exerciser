(function() {

    /**
     * Extend object with other
     * @param  {ojbect} this &&            this.__extends [description]
     * @return {extended object}      base object
     */
    var __extends = (this && this.__extends) || function(d, b) {
        for (var p in b)
            if (b.hasOwnProperty(p)) d[p] = b[p];

        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };

    /**
     * Get language collection data
     * @return {object} [description]
     */
    var _getLanguageCollection = function() {
        return null;
    };

    var SupportedLanguages;
    (function() {
        SupportedLanguages[SupportedLanguages['TR'] = 0] = 'TR';
        SupportedLanguages[SupportedLanguages['EN'] = 1] = 'EN';
        SupportedLanguages[SupportedLanguages['DU'] = 2] = 'DU';
        SupportedLanguages[SupportedLanguages['FR'] = 3] = 'FR';
        SupportedLanguages[SupportedLanguages['RU'] = 4] = 'RU';
    })(SupportedLanguages || (SupportedLanguages = {}));

    var SelectedLanguage = SupportedLanguages[0];
    var LanguageCollection = _getLanguageCollection || window.languageData || {};
    window._$ = function(keyword) {
        var body = document.getElementById('body');
        return LanguageCollection[keyword];
    };
})();
