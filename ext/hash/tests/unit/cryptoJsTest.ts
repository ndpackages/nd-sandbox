import CryptoJS from "crypto-js";
import tester from "../../../../../tool/test/domain/libs/tester";
import assert from "../../../../../tool/test/domain/libs/assert";
import ConvHelper from "../../../../ext/binary/helpers/ConvHelper";
import Sha256HmacHasher from "../../libs/hashers/Sha256HmacHasher";

tester.define('hash.hash', function () {
    let hash;

    // hash = CryptoJS.MD5("Message").toString(CryptoJS.enc.Hex);
    // assert.isEqual('4c2a8fe7eaf24721cc7a9f0175115bd4', hash);

    // hash = CryptoJS.SHA1("Message").toString(CryptoJS.enc.Hex);
    // assert.isEqual('68f4145fee7dde76afceb910165924ad14cf0d00', hash);

    // hash = CryptoJS.SHA256("Message").toString(CryptoJS.enc.Hex);
    // assert.isEqual('2f77668a9dfbf8d5848b9eeb4a7145ca94c6ed9236e4a773f6dcafa5132b2f91', hash);

    // hash = CryptoJS.SHA512("Message").toString(CryptoJS.enc.Hex);
    // assert.isEqual('4fb472dfc43def7a46ad442c58ac532f89e0c8a96f23b672f5fd637652eab158d4d589444ef7530a34e6626b40830b4e1ec5364611ae31c599bffa958e8b4c4e', hash);

    // hash = CryptoJS.SHA3("Message").toString(CryptoJS.enc.Hex);
    // assert.isEqual('0664441aca014fb2482fb6d412d506391c15e0a10645d1a4ec25869c234de7fb39eb056211a86037663d4440d22455e638394cb4f56a9694a7b89e7577ede2a5', hash);

    // hash = CryptoJS.SHA3("Message", {outputLength: 512}).toString(CryptoJS.enc.Hex);
    // assert.isEqual('0664441aca014fb2482fb6d412d506391c15e0a10645d1a4ec25869c234de7fb39eb056211a86037663d4440d22455e638394cb4f56a9694a7b89e7577ede2a5', hash);

    // hash = CryptoJS.SHA3("Message", {outputLength: 384}).toString(CryptoJS.enc.Hex);
    // assert.isEqual('0c8d6ff6e6a1cf18a0d55b20f0bca160d0d1c914a5e842f3707a25eeb20a279f6b4e83eda8e43a67697832c7f69f53ca', hash);

    // hash = CryptoJS.SHA3("Message", {outputLength: 256}).toString(CryptoJS.enc.Hex);
    // assert.isEqual('9a59efbc471b53491c8038fd5d5fe3be0a229873302bafba90c19fbe7d7c7f35', hash);

    // hash = CryptoJS.SHA3("Message", {outputLength: 224}).toString(CryptoJS.enc.Hex);
    // assert.isEqual('41a67a17f83673c511a8c0f6b55c6ee7e0faa8de66dd9c026fcc3dec', hash);

    // hash = CryptoJS.RIPEMD160("Message").toString(CryptoJS.enc.Hex);
    // assert.isEqual('85eab2fe4383a869da13d51f4b91506924b1f821', hash);
});


tester.define('hash.hmac', function () {
    let hash;

    const key = 'Secret Passphrase';
    const message = 'Message';

    // hash = CryptoJS.MD5("Message").toString(CryptoJS.enc.Hex);
    // assert.isEqual('4c2a8fe7eaf24721cc7a9f0175115bd4', hash);

    // hash = CryptoJS.HmacMD5("Message", "Secret Passphrase").toString(CryptoJS.enc.Hex);
    // assert.isEqual('5e03d0c1b42ef0b7e61fb333f3993949', hash);

    // hash = CryptoJS.HmacSHA1("Message", "Secret Passphrase").toString(CryptoJS.enc.Hex);
    // assert.isEqual('e90f713295ea4cc06c92c9248696ffafc5d01faf', hash);



    // hash = CryptoJS.HmacSHA256("Message", "Secret Passphrase").toString(CryptoJS.enc.Hex);
    // assert.isEqual('32c647602ab4c4c7543e9c50ae25e567c3354e1532b11649ce308e6e2568d205', hash);

    hash = (new Sha256HmacHasher(key)).hash(message);
    assert.isEqualHex('32c647602ab4c4c7543e9c50ae25e567c3354e1532b11649ce308e6e2568d205', hash);

    // hash = CryptoJS.HmacSHA512("Message", "Secret Passphrase").toString(CryptoJS.enc.Hex);
    // assert.isEqual('c03f82cd6f9d03920d95caeedfa722d4e42325a18b049942ee5560787ad2aa394be6b95849c563ecdd37495726cd6236529a721b563b9778dd6119939bcab7e1', hash);
});
