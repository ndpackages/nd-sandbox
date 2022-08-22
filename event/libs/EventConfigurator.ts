import container from "../../container/singletons/container";
import eventEmitter from "../singletons/eventEmitter";

export default class EventConfigurator {

    private configCollection = [];

    register(callback) {
        this.configCollection.push(callback);
    }

    initAll() {
        for(let i in this.configCollection) {
            let callback = this.configCollection[i];
            callback(container, eventEmitter);
        }
    }
}
