import tester from "../../../../../tool/test/domain/libs/tester";
import assert from "../../../../../tool/test/domain/libs/assert";
import passwordGeneratorFactory from "../../factories/passwordGeneratorFactory";

tester.define('PasswordGenerator.generate.10', function () {
    let values = {
        privateKey: '111',
        host: 'yandex.kz',
        login: 'user1',
        nonce: 1,
    };
    // let passwordGenerator = new PasswordGenerator(values.privateKey, 10);
    let passwordGenerator = passwordGeneratorFactory.createInstanceV1(values.privateKey, 10);
    let password = passwordGenerator.generate(values.host, values.login, values.nonce);

    assert.isEqual('q-fr6A%&Z1', password);

    values.nonce = 2;
    password = passwordGenerator.generate(values.host, values.login, values.nonce);

    assert.isEqual('-5v9fF+<Cf', password);
});

tester.define('PasswordGenerator.generate.10.withSpaces', function () {
    let values = {
        privateKey: '     111         ',
        host: '       yandex.kz      ',
        login: '      user1        ',
        nonce: 1,
    };
    // let passwordGenerator = new PasswordGenerator(values.privateKey, 10);
    let passwordGenerator = passwordGeneratorFactory.createInstanceV1(values.privateKey, 10);
    let password = passwordGenerator.generate(values.host, values.login, values.nonce);

    assert.isEqual('q-fr6A%&Z1', password);
});

tester.define('PasswordGenerator.generate.12', function () {

    let values = {
        privateKey: '111',
        host: 'yandex.kz',
        login: 'user1',
        nonce: 1,
    };
    // let passwordGenerator = new PasswordGenerator(values.privateKey, 12);
    let passwordGenerator = passwordGeneratorFactory.createInstanceV1(values.privateKey, 12);
    let password = passwordGenerator.generate(values.host, values.login, values.nonce);

    assert.isEqual('q-fr6A%&Z1:f', password);

    values.nonce = 2;
    password = passwordGenerator.generate(values.host, values.login, values.nonce);

    assert.isEqual('-5v9fF+<CfBV', password);
});

tester.define('PasswordGenerator.18kPbkdf2.generate.12', function () {

    let values = {
        privateKey: '111',
        host: 'yandex.kz',
        login: 'user1',
        nonce: 1,
    };
    // let passwordGenerator = new PasswordGenerator(values.privateKey, 12);
    let passwordGenerator = passwordGeneratorFactory.createInstance18kPbkdf2(values.privateKey, 12);
    let password = passwordGenerator.generate(values.host, values.login, values.nonce);

    assert.isEqual('!qN$Ejh-b.jf', password);

    values.nonce = 2;
    password = passwordGenerator.generate(values.host, values.login, values.nonce);

    assert.isEqual('q8#iL:N8+#AR', password);
});
