import AesDataEntity from "../../domain/entities/AesDataEntity";
import tester from "../../../../../tool/test/domain/libs/tester";
import assert from "../../../../../tool/test/domain/libs/assert";
import ConvHelper from "../../../../ext/binary/helpers/ConvHelper";
import AesEncryption from "../../domain/libs/AesEncryption";
import aesjs from 'aes-js';
import HexEncoder from "../../../../ext/baseX/libs/encoders/HexEncoder";

tester.define('aes.encrypt', function () {
    let keyEntity = {
        encryptKey: ConvHelper.toBuffer('000102030405060708090a0b0c0d0e0f', 'hex'),
        hmacKey: ConvHelper.toBuffer('101112131415161718191a1b1c1d1e1f', 'hex'),
    };
    let message = 'What is Lorem Ipsum?\n' +
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.';

    let enc = new AesEncryption(keyEntity, false);
    let aesDataEntity = enc.encrypt(message);
    let decrypted = enc.decrypt(aesDataEntity);

    let decryptedText = aesjs.utils.utf8.fromBytes(decrypted);

    assert.isEqual(message, decryptedText);
});

tester.define('aes.encrypt.withIv', function () {
    let keyEntity = {
        encryptKey: ConvHelper.toBuffer('000102030405060708090a0b0c0d0e0f', 'hex'),
        hmacKey: ConvHelper.toBuffer('101112131415161718191a1b1c1d1e17', 'hex'),
    };
    let message = 'What is Lorem Ipsum?\n' +
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.';

    let iv = ConvHelper.toBuffer('0d470c92a95e739e62075f077aa7e1d4', 'hex');
    let enc = new AesEncryption(keyEntity, false);
    let aesDataEntity = enc.encrypt(message, iv);
    // let encryptedHex = HexHelper.encode(aesDataEntity.encrypted);
    // console.log(aesDataEntity);

    assert.isEqualHex('7fc499c99edc3cab23c76fb139d77b6e468714effb1241cb972d35134073c5b72eafbaf3f1ff4e37be541eb06b3d1a2a62d6c9fcc3437633560201dd8bd8a18512b8bd3dd4b1c5a9fc79ce5284a26789ffb96fcabfb97b10e504ee1ac4543abfe2d23e1feafbb0997b4ecb7fab949ffd79d34eb5bcba28c0b3a37fe580c386292fccf8288689ad29be5bc88b0e370d2010a02a8dcf732a41919ab6d189cd27604b7e5b407233a26fc3b25a8c2d769b687a1206be84348636b136e7d22424d4bdb93c8f86bf0b2bcc909fa8141090d922d6fa0859ec43b96fad35477db851cbb4b0f450305d31257a8eb526dc3991a84caa4f5226de263738fd957aa4a0c223191c138e2fc3be27287a9eb03317f66571aa7df74825131b37752c6c6d6c3c5ab7b9a27e2bf439ffd736a28145a4540b033f08ccffaabc643d040aaf6d74c6d46614088a7dca1cd2f73993ea4f0a0d5f53549ad294ba4f7434cb160e03a4e99bec16b8a29da846bc2b8ce14f75b57b3d88129a24d68e1a3b2cf78ed599b4d31241706a0448b421b8a6ec02bacb20612d4ec123773b3bc06d0562bf0a8c522c34f5514e78396989d2377d22ce4061c9e23d924475a820ec490c5a34ff17466bedbd39882a90b8922c30f28df4d214fbab90eb248475d69a1e057b384dc9bd84ac5fe074c88100a18406db17016910a9d59bcd9ecef7ff27871dd73b5d78a16dc851b555ad8163fd97d885f6ac2613987ad26f29f9360975908cb8b3d0f9337b77e35310a95325e55e992ceef244af96efa73e0789f88c6a91ae5aa60a962c27b9e3b7701d12d13e70164c98f6bdba789e97e568ec', aesDataEntity.encrypted);
    assert.isEqualHex('0d470c92a95e739e62075f077aa7e1d4', aesDataEntity.iv);
    // assert.isEqualHex('', aesDataEntity.salt);
    assert.isEqualHex('734a49871f30ff3da019f122ed8257eedfead396621092f72ba00a6bc29c4d69', aesDataEntity.mac);

    let decrypted = enc.decrypt(aesDataEntity);
    let decryptedText = aesjs.utils.utf8.fromBytes(decrypted);

    assert.isEqual(message, decryptedText);
});

tester.define('aes.encrypt.withIv.binary', function () {
    let keyEntity = {
        encryptKey: ConvHelper.toBuffer('000102030405060708090a0b0c0d0e0f', 'hex'),
        hmacKey: ConvHelper.toBuffer('101112131415161718191a1b1c1d1e1f', 'hex'),
    };
    let message = ConvHelper.toBuffer('1001020704050607080a0a0b0c0d0e0f', 'hex');

    let iv = ConvHelper.toBuffer('0d470c92a95e739e62075f077aa7e1d4', 'hex');
    let enc = new AesEncryption(keyEntity, false);
    let aesDataEntity = enc.encrypt(message, iv);
    // let encryptedHex = HexHelper.encode(aesDataEntity.encrypted);
    // console.log(aesDataEntity);

    assert.isEqualHex('38adfababab0498c67a217df58fa3c11', aesDataEntity.encrypted);
    assert.isEqualHex('0d470c92a95e739e62075f077aa7e1d4', aesDataEntity.iv);
    // assert.isEqualHex('', aesDataEntity.salt);
    assert.isEqualHex('bedf98cdc72a84f1f79e3c216f720e5cf391b102ec80d41760eb21c4fb6eb6ac', aesDataEntity.mac);

    let decrypted = enc.decrypt(aesDataEntity);
    let decryptedText = aesjs.utils.utf8.fromBytes(decrypted);

    assert.isEqualBinaries(message, decryptedText);
});

tester.define('aes.decrypt', function () {
    let keyEntity = {
        encryptKey: ConvHelper.toBuffer('000102030405060708090a0b0c0d0e0f', 'hex'),
        hmacKey: ConvHelper.toBuffer('101112131415161718191a1b1c1d1e1f', 'hex'),
    };
    let message = 'What is Lorem Ipsum?\n' +
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.';

    let hexEncoder = new HexEncoder();

    let aesDataEntity: AesDataEntity = new AesDataEntity();
    aesDataEntity.encrypted = hexEncoder.decode('7fc499c99edc3cab23c76fb139d77b6e468714effb1241cb972d35134073c5b72eafbaf3f1ff4e37be541eb06b3d1a2a62d6c9fcc3437633560201dd8bd8a18512b8bd3dd4b1c5a9fc79ce5284a26789ffb96fcabfb97b10e504ee1ac4543abfe2d23e1feafbb0997b4ecb7fab949ffd79d34eb5bcba28c0b3a37fe580c386292fccf8288689ad29be5bc88b0e370d2010a02a8dcf732a41919ab6d189cd27604b7e5b407233a26fc3b25a8c2d769b687a1206be84348636b136e7d22424d4bdb93c8f86bf0b2bcc909fa8141090d922d6fa0859ec43b96fad35477db851cbb4b0f450305d31257a8eb526dc3991a84caa4f5226de263738fd957aa4a0c223191c138e2fc3be27287a9eb03317f66571aa7df74825131b37752c6c6d6c3c5ab7b9a27e2bf439ffd736a28145a4540b033f08ccffaabc643d040aaf6d74c6d46614088a7dca1cd2f73993ea4f0a0d5f53549ad294ba4f7434cb160e03a4e99bec16b8a29da846bc2b8ce14f75b57b3d88129a24d68e1a3b2cf78ed599b4d31241706a0448b421b8a6ec02bacb20612d4ec123773b3bc06d0562bf0a8c522c34f5514e78396989d2377d22ce4061c9e23d924475a820ec490c5a34ff17466bedbd39882a90b8922c30f28df4d214fbab90eb248475d69a1e057b384dc9bd84ac5fe074c88100a18406db17016910a9d59bcd9ecef7ff27871dd73b5d78a16dc851b555ad8163fd97d885f6ac2613987ad26f29f9360975908cb8b3d0f9337b77e35310a95325e55e992ceef244af96efa73e0789f88c6a91ae5aa60a962c27b9e3b7701d12d13e70164c98f6bdba789e97e568ec');
    aesDataEntity.iv = hexEncoder.decode('0d470c92a95e739e62075f077aa7e1d4');
    aesDataEntity.mac = hexEncoder.decode('c1f83e83cba3624325309afb4827e1f588b7e5d4d0d3a611fbdb7c0974ee4aea');

    let enc = new AesEncryption(keyEntity, false);
    let decrypted = enc.decrypt(aesDataEntity);
    let decryptedText = aesjs.utils.utf8.fromBytes(decrypted);

    assert.isEqual(message, decryptedText);
});

tester.define('aes.decryptFromBinary', function () {
    let keyEntity = {
        encryptKey: ConvHelper.toBuffer('000102030405060708090a0b0c0d0e0f', 'hex'),
        hmacKey: ConvHelper.toBuffer('101112131415161718191a1b1c1d1e1f', 'hex'),
    };
    let message = ConvHelper.toBuffer('1001020704050607080a0a0b0c0d0e0f', 'hex');

    let hexEncoder = new HexEncoder();
    let aesDataEntity: AesDataEntity = new AesDataEntity();
    aesDataEntity.encrypted = hexEncoder.decode('38adfababab0498c67a217df58fa3c11');
    aesDataEntity.iv = hexEncoder.decode('0d470c92a95e739e62075f077aa7e1d4');
    aesDataEntity.mac = hexEncoder.decode('bedf98cdc72a84f1f79e3c216f720e5cf391b102ec80d41760eb21c4fb6eb6ac');

    let enc = new AesEncryption(keyEntity, false);
    let decrypted = enc.decrypt(aesDataEntity);

    assert.isEqualBinaries(message, decrypted);
});

tester.define('aes.decryptFailMac', function () {
    assert.skip();
    let keyEntity = {
        encryptKey: ConvHelper.toBuffer('000102030405060708090a0b0c0d0e0f', 'hex'),
        hmacKey: ConvHelper.toBuffer('101112131415161718191a1b1c1d1e1a', 'hex'),
    };

    let aesDataEntity = new AesDataEntity();
    aesDataEntity.encrypted = {
        cipher: ConvHelper.toBuffer("xfIXzdWB7MO5H0mM7G35iQ==", 'base64'),
        iv: ConvHelper.toBuffer("0d470c92a95e739e62075f077aa7e1d4", 'hex'),
        salt: ConvHelper.toBuffer("e35f0149af05b83f", 'hex'),
    };
    aesDataEntity.mac = ConvHelper.toBuffer("cc267bd9515c1eba2cf6aaa1fc8380677f4351fcbea6d70873df5a335efcee0d", 'hex');

    try {
        let enc = new AesEncryption(keyEntity, false);
        enc.decrypt(aesDataEntity);
    } catch (e) {
        assert.isEqual('Message Authentication Code (MAC) not valid!', e.message);
    }
});

tester.define('aes.decryptFailEncryptKey', function () {
    assert.skip();
    let keyEntity = {
        encryptKey: ConvHelper.toBuffer('000102030405060708090a1b0c0d0e0f', 'hex'),
        hmacKey: ConvHelper.toBuffer('101112131415161718191a1b1c1d1e1f', 'hex'),
    };
    let message = ConvHelper.toBuffer('1001020704050607080a0a0b0c0d0e0f', 'hex');

    let iv = ConvHelper.toBuffer('0d470c92a95e739e62075f077aa7e1d4', 'hex');
    let enc = new AesEncryption(keyEntity, false);
    let aesDataEntity = enc.encrypt(message, iv);
    // let encryptedHex = HexHelper.encode(aesDataEntity.encrypted);
    // console.log(aesDataEntity);

    // assert.isEqualHex('38adfababab0498c67a217df58fa3c11', aesDataEntity.encrypted);
    assert.isEqualHex('0d470c92a95e739e62075f077aa7e1d4', aesDataEntity.iv);
    // assert.isEqualHex('', aesDataEntity.salt);
    assert.isEqualHex('bedf98cdc72a84f1f79e3c216f720e5cf391b102ec80d41760eb21c4fb6eb6ac', aesDataEntity.mac);

    let decrypted = enc.decrypt(aesDataEntity);
    let decryptedText = aesjs.utils.utf8.fromBytes(decrypted);

    assert.isEqualBinaries(message, decryptedText);
});
