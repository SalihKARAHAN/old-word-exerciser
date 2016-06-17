import IIO = require('./IIO');
import FileSystem = require('fs');

class DiskIO implements IIO {

    public Read(path: string, encoding: string, callback: any): void {
        debugger;
        FileSystem.readFile(path, encoding, function(error, text) {
            if (!callback) {
                throw 'Error message! (DiskIO.TS;ln:9)';
            }
            if (error) {
                callback(error);
            }

            callback(text);
        });
    }

}

export = DiskIO;
