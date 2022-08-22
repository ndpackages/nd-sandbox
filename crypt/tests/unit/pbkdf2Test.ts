import tester from "../../../../tool/test/domain/libs/tester";
import pbkdf2 from "pbkdf2-sha256";
import assert from "../../../../tool/test/domain/libs/assert";
import BenchmarkHelper from "../../../core/helpers/BenchmarkHelper";

tester.define('pbkdf2.encode.iterations-1.keyLen-64', function () {

    let key = 'passwd';
    let salt = 'salt';
    let iterations = 1;
    let keyLenBytes = 64;

    BenchmarkHelper.start('pbkdf2');
    let encoded = pbkdf2(key, salt, iterations, keyLenBytes);
    let runtime = BenchmarkHelper.end('pbkdf2');

    assert.lessThan(0.02, runtime);
    // assert.greaterThan(0.000008, runtime);
    assert.isEqualHex('55ac046e56e3089fec1691c22544b605f94185216dde0465e68b9d57c20dacbc49ca9cccf179b645991664b39d77ef317c71b845b1e30bd509112041d3a19783', encoded);
});

tester.define('pbkdf2.encode.iterations-10.keyLen-64', function () {

    let key = 'passwd';
    let salt = 'salt';
    let iterations = 10000;
    let keyLenBytes = 64;

    BenchmarkHelper.start('pbkdf2');
    let encoded = pbkdf2(key, salt, iterations, keyLenBytes);
    let runtime = BenchmarkHelper.end('pbkdf2');

    assert.lessThan(0.9, runtime);
    assert.greaterThan(0.1, runtime);
    assert.isEqualHex('891ba7f6f871dbadd932fa3b35a3a07054eadd85b47aa470399b3521aaa5b6868fe92c4a135ba72058d7e1cc8207cc0a53f398b842db10196ffc1adfe6cac738', encoded);
});
