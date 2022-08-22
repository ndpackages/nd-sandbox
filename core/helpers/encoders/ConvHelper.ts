import conv from 'binstring';

/*function createBinaryString(nMask, len = 32) {
    // nMask must be between -2147483648 and 2147483647
    let sMask;
    for (let nFlag = 0, nShifted = nMask, sMask = ""; nFlag < len;
         nFlag++, sMask += String(nShifted >>> (len - 1)), nShifted <<= 1) ;
    return sMask;
}*/

export default class ConvHelper {

    static readonly HEX = 'hex';
    static readonly BINARY = 'binary';
    static readonly UTF8 = 'utf8';
    static readonly BYTES = 'bytes';
    static readonly BUFFER = 'buffer';

    static encode(data, fromFormat, toFormat) {
        if (toFormat === this.UTF8 && typeof data === 'string') {
            //return data;
        }
        if (toFormat === this.BUFFER && data instanceof Buffer) {
            return data;
        }
        return conv(data, {
            in: fromFormat,
            out: toFormat
        });
    }

    static decode(data, fromFormat, toFormat) {
        return this.encode(data, toFormat, fromFormat);
    }

    /*static dec2bin(dec) {
        return createBinaryString(dec);
        // return Number(dec).toString(2);
        //return (dec >>> 0).toString(2);
    }*/

    /*static toUtf8(unit8array) {
        return aesjs.utils.utf8.fromBytes(unit8array);
    }*/

    static toBytes(value, fromFormat = undefined) {
        let options = {out: 'bytes'};
        if (fromFormat) {
            options["in"] = fromFormat;
        }
        return conv(value, options);
    }

    static toBuffer(value, fromFormat = undefined) {
        let options = {out: 'buffer'};
        if (fromFormat) {
            options["in"] = fromFormat;
        }
        return conv(value, options);
    }

    static toHex(value, fromFormat = undefined) {
        let options = {out: 'hex'};
        if (fromFormat) {
            options["in"] = fromFormat;
        }
        return conv(value, options);
    }
}
