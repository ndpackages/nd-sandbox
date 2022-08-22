import _ from "lodash";
import ConvHelper from "./encoders/ConvHelper";

/*function Utf8ArrayToStr(array) {
    var out, i, len, c;
    var char2, char3;

    out = "";
    len = array.length;
    i = 0;
    while(i < len) {
        c = array[i++];
        switch(c >> 4)
        {
            case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
            // 0xxxxxxx
            out += String.fromCharCode(c);
            break;
            case 12: case 13:
            // 110x xxxx   10xx xxxx
            char2 = array[i++];
            out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
            break;
            case 14:
                // 1110 xxxx  10xx xxxx  10xx xxxx
                char2 = array[i++];
                char3 = array[i++];
                out += String.fromCharCode(((c & 0x0F) << 12) |
                    ((char2 & 0x3F) << 6) |
                    ((char3 & 0x3F) << 0));
                break;
        }
    }

    return out;
}*/

function numberToBytes(number) {
    // you can use constant number of bytes by using 8 or 4
    const len = Math.ceil(Math.log2(number) / 8);
    const byteArray = new Uint8Array(len);

    for (let index = 0; index < byteArray.length; index++) {
        const byte = number & 0xff;
        byteArray[index] = byte;
        number = (number - byte) / 256;
    }

    return byteArray;
}

function bytesToNumber(byteArray) {
    let result = 0;
    for (let i = byteArray.length - 1; i >= 0; i--) {
        result = (result * 256) + byteArray[i];
    }

    return result;
}

export default class Uint8ArrayHelper {

    static encode(value) {
        if(_.isInteger(value)) {
            return numberToBytes(value);
        }
        if(value instanceof Uint8Array) {
            return value;
        }
        return ConvHelper.toBuffer(value);
    }

    static decodeToArray(uint: Uint8Array) {
        /*if(!uint instanceof Uint8Array) {
            throw new Error('Value type not Uint8Array');
        }*/
        return Array.from(uint);
    }

    static decodeToString(uint: Uint8Array) {
        /*if(!uint instanceof Uint8Array) {
            throw new Error('Value type not Uint8Array');
        }*/
        // return Utf8ArrayToStr(uint);
        // return String.fromCharCode.apply(null, uint);
        // return new TextDecoder().decode(uint);
        return uint.toString();
    }

    static decodeToInteger(uint: Uint8Array) {
        /*if(!uint instanceof Uint8Array) {
            throw new Error('Value type not Uint8Array');
        }*/
        // return Utf8ArrayToStr(uint);
        // return String.fromCharCode.apply(null, uint);
        // return new TextDecoder().decode(uint);
        return bytesToNumber(uint);
    }

    static merge(uint1, uint2) {
        let array1 = this.decodeToArray(uint1);
        let array2 = this.decodeToArray(uint2);
        for(let i in array2) {
            let value2 = array2[i];
            array1.push(value2);
        }
        return this.encode(array1);
    }
}
