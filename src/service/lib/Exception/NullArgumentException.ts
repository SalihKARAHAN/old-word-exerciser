module Exception {
    export class NullArgumentException {
        private _message: string = 'Exceptions.NullArgument';
        private _date: string = null;

        constructor() {
            this._date = new Date().getDate().toString();
        }
    }
}

export =Exception;
