declare interface IIO {
    Read(path: string, encoding: string, successCallback: any, closeCallback): void;
}

export = IIO;
