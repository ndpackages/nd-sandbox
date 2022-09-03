import tester from "../../../../../tool/test/domain/libs/tester";
import assert from "../../../../../tool/test/domain/libs/assert";
import LocalStorage from "../../driver/LocalStorage";
import ConvHelper from "../../../binary/helpers/ConvHelper";
import JsonBinaryEncoder from "../../../jsonBinary/libs/encoders/JsonBinaryEncoder";

tester.define('jsonBinaryEncoder.encode', function () {

    let encoder = new JsonBinaryEncoder();

    let binary = ConvHelper.toBuffer('0d470c92a95e739e62075f077aa7e1d4', 'hex');
    let input = {
        name: "test",
        contentBinary: binary,
        arr: [
            2112,
            {
                qwe: binary,
                zxc: binary,
            }
        ],
    };

    let encoded = encoder.encode(input);
    let output = encoder.decode(encoded);

    console.log(encoded);
    console.log('input', input);
    console.log('output', output);

    assert.isEqualObject(input, output);
    // assert.isEqual('{"name":"test","contentBinary:[Uint8Array]":"0d470c92a95e739e62075f077aa7e1d4"}', encoded);
});

tester.define('localStorageDriver.set', function () {

    let binary = ConvHelper.toBuffer('0d470c92a95e739e62075f077aa7e1d4', 'hex');
    let input = {
        name: "test",
        contentBinary: binary,
    };

    let ls = new LocalStorage();
    ls.set('test.key1', input);

    let output = ls.get('test.key1');

    assert.isEqualObject(input, output);
});
