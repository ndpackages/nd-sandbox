import tester from "../../../../../tool/test/domain/libs/tester";
import assert from "../../../../../tool/test/domain/libs/assert";
import LocalStorage from "../../driver/LocalStorage";
import ConvHelper from "../../../binary/helpers/ConvHelper";

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
