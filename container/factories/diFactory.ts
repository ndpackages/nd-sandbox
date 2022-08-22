import {DiContainer} from "bubble-di";

class DiFactory {

    createDi() {
        DiContainer.setContainer(new DiContainer());
        let di = DiContainer.getContainer();
        return di;
    }
}

export default new DiFactory();
