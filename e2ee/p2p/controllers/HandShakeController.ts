import container from "../../../container/singletons/container";
import ConvHelper from "../../../core/helpers/encoders/ConvHelper";
import toastFacade from "../../../notify/facades/toastFacade";
import _ from "lodash";
import * as crypto from "crypto";
import AesFactory from "../../../aes/domain/factories/AesFactory";
import BaseP2pController from "../../../../crypto/transport/domain/base/BaseP2pController";
import eventEmitter from "../../../event/singletons/eventEmitter";
import HandShakeEventEnum from "../../domain/enums/HandShakeEventEnum";
import HandShakeRepository from "../../domain/repositories/p2p/HandShakeRepository";
import Utf8Helper from "../../../core/helpers/encoders/Utf8Helper";

export default class HandShakeController extends BaseP2pController {

    start(address, request = null) {
        this.helloServer(address).then();
    }

    /**
     * Шаг 1. Приветствие серверу
     *
     * Клиент -> сервер
     *
     * Генерируются числа по алгоритму Диффи-Хэллмана
     * Собеседнику отправляется публичное число ДХ и ID сессии
     * Публичный ключ он получит из подписи запроса
     *
     * Во временном хранилище сохраняется
     */
    helloServer(address: string, request = null) {
        let sessionEntity = this.sessionService.get(address);
        let params = {};
        // params["mod"] = 'modp16';
        let dhInstance = this.forgeDhInstance(sessionEntity, request);

        // params["prime"] = dhInstance.getPrime();
        dhInstance.generateKeys();
        let dhPublic = dhInstance.getPublicKey();
        sessionEntity['dh'] = params;
        // toastFacade.success('HandShake.helloServer');

        let handShakeRepository: HandShakeRepository = container.get('e2ee.repositories.p2p.handShake');
        handShakeRepository.helloServer(address, sessionEntity['sessionId'], dhPublic).then(() => {});

        return new Promise(() => {});
    }

    /**
     * Шаг 2. Приветствие клиенту
     *
     * Сервер -> клиент
     *
     * Принимается от клиента публичное число ДХ и ID сессии
     * Генерируются числа по алгоритму Диффи-Хэллмана
     * Вычисляется общий эфимерный секретный ключ из моего + клиентского публичного числа ДХ
     * Клиенту отправляется мое публичное число ДХ
     *
     */
    helloClient(address, request) {
        let sessionEntity = this.sessionService.get(address);
        let params = {};
        // params["mod"] = request.dh.mod;
        // let dh = crypto.getDiffieHellman(request.dh.mod);

        let dhInstance = this.forgeDhInstance(sessionEntity, request);

        // params["prime"] = dhInstance.getPrime();
        dhInstance.generateKeys();
        let dhPublic = dhInstance.getPublicKey();
        let publicBinary = request.dh.public;
        params["share"] = dhInstance.computeSecret(publicBinary);

        sessionEntity['dh'] = params;
        this.sessionService.persist(sessionEntity);

        // toastFacade.success('HandShake.helloClient');

        let handShakeRepository: HandShakeRepository = container.get('e2ee.repositories.p2p.handShake');
        handShakeRepository.helloClient(address, sessionEntity['sessionId'], dhPublic).then(() => {});

    }

    /**
     * Шаг 3. Генерация сессионных ключей
     *
     * Клиент -> сервер
     *
     * Генерация сессионного общего ключа для шифрования и контрольной суммы (MAC)
     * Шифрование этих ключей общим эфимерным секретным ключом
     * Отправляется шифрованные сессионные ключи
     * В локальном хранилище сохраняются сессионные ключи
     * На этом шаге клиент уже готов к переходу в режим шифрования
     */
    getSessionKeys(address, request) {
        let sessionEntity = this.sessionService.get(address);
        let params = {};
        let dhInstance = this.forgeDhInstance(sessionEntity, request);

        // let dhInstance = container.get('e2ee.libs.dh');
        let publicBinary = request.dh.public;
        let shareSecret = dhInstance.computeSecret(publicBinary);

        sessionEntity['dh'] = params;

        let keyEntity = this.extractKeysFromShareSecret(shareSecret);

        let sessionKeys = {
            encryptKey: crypto.randomBytes(32),
            hmacKey: crypto.randomBytes(32),
        };

        this.persistSessionKeys(address, sessionKeys);

        let formatEncryption = AesFactory.createEncoderStringFormat(keyEntity);

        let encryptedKeys = {
            encryptKey: formatEncryption.encrypt(sessionKeys.encryptKey),
            hmacKey: formatEncryption.encrypt(sessionKeys.hmacKey),
        };

        // toastFacade.success('HandShake.getSessionKeys - send session keys');

        let handShakeRepository: HandShakeRepository = container.get('e2ee.repositories.p2p.handShake');
        handShakeRepository.saveSessionKeys(address, sessionEntity['sessionId'], encryptedKeys).then(() => {});
    }

    /**
     * Шаг 4. Прием и расшифровка сессионных ключей
     *
     * Сервер -> клиент
     *
     * В локальном хранилище сохраняются сессионные ключи
     * Шифрование сообщения, что можно переидти в режим шифрования сессионным ключом
     * Отправляется сообщение
     * На этом шаге сервер уже готов к переходу в режим шифрования
     */
    saveSessionKeys(address, request) {
        let sessionEntity = this.sessionService.get(address);

        let encryptedKeys = request.encryptedKeys;
        let shareSecret = sessionEntity['dh']['share'];

        let keyEntity = this.extractKeysFromShareSecret(shareSecret);

        let formatEncryption = AesFactory.createEncoderStringFormat(keyEntity);

        let sessionKeys = {
            encryptKey: formatEncryption.decrypt(encryptedKeys.encryptKey),
            hmacKey: formatEncryption.decrypt(encryptedKeys.hmacKey),
        };

        this.persistSessionKeys(address, sessionKeys);

        let sessionFormatEncryption = AesFactory.createEncoderStringFormat(sessionKeys);

        this.sessionService.persist(sessionEntity);

        // toastFacade.success('HandShake.saveSessionKeys - receive session keys');

        let handShakeRepository: HandShakeRepository = container.get('e2ee.repositories.p2p.handShake');
        handShakeRepository.finish(address, sessionEntity['sessionId'], sessionFormatEncryption.encrypt('Hello')).then(() => {});
    }

    finish(address, request) {
        let sessionEntity = this.sessionService.get(address);
        let keyEntity = sessionEntity['sessionKeys'];
        let formatEncryption = AesFactory.createEncoderStringFormat(keyEntity);
        let decrypted = formatEncryption.decrypt(request.encrypted);
        let decryptedText = Utf8Helper.encode(decrypted);

        if(decryptedText === 'Hello') {
            toastFacade.success('HandShake.finish success!');
        } else {
            toastFacade.error('HandShake.finish error');
        }

        console.log('finish', decryptedText);
        console.log('finish sessionEntity', sessionEntity);
        console.log('finish keyEntity', keyEntity);
    }

    private extractKeysFromShareSecret(share) {
        return {
            encryptKey: share.slice(0, 32),
            hmacKey: share.slice(33, 65),
        };
    }

    private forgeDhInstance(sessionEntity, request) {
        let dh;
        dh = container.get('e2ee.libs.dh');
        /*if (lodash.has(sessionEntity, 'dh.handler')) {
            dh = lodash.get(sessionEntity, 'dh.handler');
        } else {
            dh = container.get('e2ee.libs.dh');
            // dh = crypto.getDiffieHellman(request['dh']['mod']);
        }*/
        return dh;
    }

    persistSessionKeys(address, sessionKeys) {
        let sessionEntity = this.sessionService.get(address);
        sessionEntity['sessionKeys'] = _.clone(sessionKeys);
        this.sessionService.persist(sessionEntity);
        eventEmitter.emit(HandShakeEventEnum.COMPLETE, address);
    }
}
