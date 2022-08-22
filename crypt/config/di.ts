import diConfigurator from "../../../packages/container/singletons/diConfigurator";
import DocumentRepository from "../repositories/rpc/DocumentRepository";
import DocumentService from "../services/DocumentService";

export default function configureDi(domainName) {
    let bundleDiConfigurator = diConfigurator.createInstance(domainName);

    bundleDiConfigurator.bind("repositories.api.document", DocumentRepository);
    bundleDiConfigurator.bind("services.document", DocumentService, [
        "signature.services.signer",
        "this.repositories.api.document",
    ]);
}
