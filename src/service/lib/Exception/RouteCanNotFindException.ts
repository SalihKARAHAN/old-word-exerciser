module Exception {
    export class RouteCanNotFindException {
        private _message: string = 'Exceptions.RouteCanNotFind';
        private _date: string = null;

        constructor() {
            this._date = new Date().getDate().toString();
        }
    }
}

export = Exception;
