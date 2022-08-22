import TimeHelper from "../core/helpers/TimeHelper";

export default class Timer {

    protected handler = null;
    protected isDisposable = true;

    timestamp() {
        return TimeHelper.timestamp();
    }

    stop() {
        clearInterval(this.handler);
        this.handler = null;
    }

    start(interval = 1000, onTick) {
        if (this.handler === null) {
            this.handler = setInterval(() => {
                onTick();
                if (this.isDisposable) {
                    this.stop();
                }
            }, interval);
        }
    }
}
