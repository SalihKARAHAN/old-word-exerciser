declare interface IIO {
    Read(path: string, encoding: string, callback: any): void;
}

export = IIO;
