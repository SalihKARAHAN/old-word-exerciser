import IIO = require('./IIO');
import FileSystem = require('fs');

class DiscIO implements IIO {

    public Read(path: string, encoding: string, successCallback: any, closeCallback): void {
        debugger;
        let stream = FileSystem.createReadStream(path, encoding);

        // FileSystem.readFile(path, encoding, function(error, text) {
        //     if (!callback) {
        //         throw 'Error message! (DiskIO.TS;ln:9)';
        //     }
        //     if (error) {
        //         callback(error);
        //     }
        //
        //     callback(text);
        // });

        stream.on('error', function(exception) {
            console.log('\t\t\t ************** ERROR **************\n for ' + path);
        });

        stream.on('data', function(text) {
            // console.log('TEXT -> ',text);
            if (successCallback) {
                successCallback(text);
            }
        });

        stream.on('end', function() {
            console.log('\t\t!!!STREAM END for ' + path + ' !!!');
        })

        stream.on('close', function() {
            console.log('\t\t!!!STREAM CLOSE for ' + path + ' !!!');
            if (closeCallback) {
                closeCallback();
            }
        });
    }

}

export = DiscIO;
