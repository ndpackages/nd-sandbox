import tester from "../../../../../tool/test/domain/libs/tester";
import assert from "../../../../../tool/test/domain/libs/assert";
import HmacSha256Hasher from "../../libs/encoders/hmac/HmacSha256Hasher";
import HmacSha1Hasher from "../../libs/encoders/hmac/HmacSha1Hasher";
import HmacMd5Hasher from "../../libs/encoders/hmac/HmacMd5Hasher";
import HmacSha512Hasher from "../../libs/encoders/hmac/HmacSha512Hasher";
import Md5Hasher from "../../libs/encoders/hash/Md5Hasher";
import Sha1Hasher from "../../libs/encoders/hash/Sha1Hasher";
import Sha512Hasher from "../../libs/encoders/hash/Sha512Hasher";
import Sha256Hasher from "../../libs/encoders/hash/Sha256Hasher";
import Sha3Hasher from "../../libs/encoders/hash/Sha3Hasher";
import Ripemd160Hasher from "../../libs/encoders/hash/Ripemd160Hasher";
import HmacRipemd160Hasher from "../../libs/encoders/hmac/HmacRipemd160Hasher";
import HmacSha3Hasher from "../../libs/encoders/hmac/HmacSha3Hasher";
import HmacSha224Hasher from "../../libs/encoders/hmac/HmacSha224Hasher";
import HmacSha384Hasher from "../../libs/encoders/hmac/HmacSha384Hasher";

tester.define('hash.hash', function () {
    let hash;
    let hasher;
    const message = 'Message';

    hash = (new Md5Hasher()).encode(message);
    assert.isEqualHex('4c2a8fe7eaf24721cc7a9f0175115bd4', hash);

    hash = (new Sha1Hasher()).encode(message);
    assert.isEqualHex('68f4145fee7dde76afceb910165924ad14cf0d00', hash);

    hash = (new Sha256Hasher()).encode(message);
    assert.isEqualHex('2f77668a9dfbf8d5848b9eeb4a7145ca94c6ed9236e4a773f6dcafa5132b2f91', hash);

    hash = (new Sha512Hasher()).encode(message);
    assert.isEqualHex('4fb472dfc43def7a46ad442c58ac532f89e0c8a96f23b672f5fd637652eab158d4d589444ef7530a34e6626b40830b4e1ec5364611ae31c599bffa958e8b4c4e', hash);

    hash = (new Sha3Hasher()).encode(message);
    assert.isEqualHex('0664441aca014fb2482fb6d412d506391c15e0a10645d1a4ec25869c234de7fb39eb056211a86037663d4440d22455e638394cb4f56a9694a7b89e7577ede2a5', hash);

    hasher = new Sha3Hasher();
    hasher.setOption('outputLength', 512);
    hash = hasher.encode(message);
    assert.isEqualHex('0664441aca014fb2482fb6d412d506391c15e0a10645d1a4ec25869c234de7fb39eb056211a86037663d4440d22455e638394cb4f56a9694a7b89e7577ede2a5', hash);

    hasher = new Sha3Hasher();
    hasher.setOption('outputLength', 384);
    hash = hasher.encode(message);
    assert.isEqualHex('0c8d6ff6e6a1cf18a0d55b20f0bca160d0d1c914a5e842f3707a25eeb20a279f6b4e83eda8e43a67697832c7f69f53ca', hash);

    hasher = new Sha3Hasher();
    hasher.setOption('outputLength', 256);
    hash = hasher.encode(message);
    assert.isEqualHex('9a59efbc471b53491c8038fd5d5fe3be0a229873302bafba90c19fbe7d7c7f35', hash);

    hasher = new Sha3Hasher();
    hasher.setOption('outputLength', 224);
    hash = hasher.encode(message);
    assert.isEqualHex('41a67a17f83673c511a8c0f6b55c6ee7e0faa8de66dd9c026fcc3dec', hash);

    hash = (new Ripemd160Hasher()).encode(message);
    assert.isEqualHex('85eab2fe4383a869da13d51f4b91506924b1f821', hash);

});


tester.define('hash.hmac', function () {
    let hash;

    const key = 'Secret Passphrase';
    const message = 'Message';

    hash = (new HmacMd5Hasher(key)).encode(message);
    assert.isEqualHex('5e03d0c1b42ef0b7e61fb333f3993949', hash);

    hash = (new HmacRipemd160Hasher(key)).encode(message);
    assert.isEqualHex('85eab2fe4383a869da13d51f4b91506924b1f821', hash);

    hash = (new HmacSha1Hasher(key)).encode(message);
    assert.isEqualHex('e90f713295ea4cc06c92c9248696ffafc5d01faf', hash);

    hash = (new HmacSha3Hasher(key)).encode(message);
    assert.isEqualHex('852995fe1c2a93663cf57456d406d35e6f81d299419e498cf108d96f2b2538b06f31702495a1057b945f7f53422b22a90209ec0fa15acad6262aa6867812f405', hash);

    hash = (new HmacSha224Hasher(key)).encode(message);
    assert.isEqualHex('59236d2047ae349e4aaddf08f75635dc88c75272e43423659ec0791a', hash);

    hash = (new HmacSha256Hasher(key)).encode(message);
    assert.isEqualHex('32c647602ab4c4c7543e9c50ae25e567c3354e1532b11649ce308e6e2568d205', hash);

    hash = (new HmacSha384Hasher(key)).encode(message);
    assert.isEqualHex('84b318cc0232a370c1f8b8746afcb575fc2debc680122c7422fd425638896d0dcf9e905b8cd9c1d7aed8d5439a2a2328', hash);

    hash = (new HmacSha512Hasher(key)).encode(message);
    assert.isEqualHex('c03f82cd6f9d03920d95caeedfa722d4e42325a18b049942ee5560787ad2aa394be6b95849c563ecdd37495726cd6236529a721b563b9778dd6119939bcab7e1', hash);

});
