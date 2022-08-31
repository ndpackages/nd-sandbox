
import diConfigurator from "./diConfigurator";
import container from "./container";
import diFactory from "../factories/diFactory";

/*DiContainer.setContainer(new DiContainer());
let di = DiContainer.getContainer();*/
let di = diFactory.createDi();

diConfigurator.di = di;
container.di = di;
