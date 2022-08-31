import {DiContainer} from "bubble-di";

class DiFactory {

    createDi() {
        DiContainer.setContainer(new DiContainer());
        return DiContainer.getContainer();
    }
}

export default new DiFactory();
