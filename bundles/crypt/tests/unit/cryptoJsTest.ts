import CryptoJS from "crypto-js";
import tester from "../../../../../tool/test/domain/libs/tester";
import assert from "../../../../../tool/test/domain/libs/assert";
import ConvHelper from "../../../../ext/binary/helpers/ConvHelper";

tester.define('cryptoJsTest.pbkdf2', function () {
    let hash;

    assert.skip();

    //hash = CryptoJS.MD5("Message").toString(CryptoJS.enc.Hex);

    var salt = CryptoJS.lib.WordArray.random(128 / 8).toString(CryptoJS.enc.Hex);

    // let salt = ConvHelper.toBuffer('e6e3d9b40466185690d495bd46871ad9');
    // console.log(salt);

    var key128Bits = CryptoJS.PBKDF2("Secret Passphrase", salt, {
        keySize: 128 / 32
    });
    //assert.isEqual('', key128Bits);

    var key256Bits = CryptoJS.PBKDF2("Secret Passphrase", salt, {
        keySize: 256 / 32
    });


    var key512Bits = CryptoJS.PBKDF2("Secret Passphrase", salt, {
        keySize: 512 / 32
    });


    var key512Bits1000Iterations = CryptoJS.PBKDF2("Secret Passphrase", salt, {
        keySize: 512 / 32,
        iterations: 1000
    });
});
