
import diConfigurator from "../../../../core/container/singletons/diConfigurator";
import P2pService from "../services/P2pService";
import SessionRepository from "../repositories/localStorage/SessionRepository";
import HandShakeRepository from "../repositories/p2p/HandShakeRepository";
import SessionService from "../services/SessionService";
import TunnelService from "../services/TunnelService";
import HandShakeController from "../../p2p/controllers/HandShakeController";
var crypto = require('diffie-hellman/browser');

export default function configureDi(domainName) {
    let bundleDiConfigurator = diConfigurator.createInstance(domainName);

    bundleDiConfigurator.bind(
        "services.p2p",
        P2pService,
        [
            'crypt.services.document',
            'e2ee.services.session',
        ]
    );


    bundleDiConfigurator.singleton("repositories.storage.session", SessionRepository);
    bundleDiConfigurator.singleton("repositories.p2p.handShake", HandShakeRepository);
    bundleDiConfigurator.bind(
        "services.session",
        SessionService,
        [
            "this.repositories.storage.session"
        ]
    );

    bundleDiConfigurator.bind(
        "services.tunnel",
        TunnelService,
        [
            'crypt.services.document',
            'e2ee.services.session',
        ]
    );

    let mod = 'modp5';
    let dh = crypto.getDiffieHellman(mod);
    bundleDiConfigurator.singleton("libs.dh", dh);
    bundleDiConfigurator.bind("controllers.handShakeController", HandShakeController, [
        'crypt.services.document',
        'e2ee.services.session',
    ]);
}
