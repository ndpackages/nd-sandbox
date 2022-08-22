import Timer from "./Timer";

export default class Cron {

    protected _timeOut = null;
    protected _timer;
    protected _startTime = null;
    protected _onExpire = null;
    protected _onTick = null;
    protected _tickInterval = null;

    constructor() {
        this._timer = new Timer();
    }

    get timeOut() {
        return this._timeOut;
    }

    set timeOut(value) {
        this._timeOut = value;
    }

    set onExpire(value) {
        this._onExpire = value;
    }

    set onTick(value) {
        this._onTick = value;
    }

    get tickInterval() {
        return this._tickInterval || 1000;
    }

    set tickInterval(value) {
        this._tickInterval = value;
    }

    stop() {
        this._timer.stop();
    }

    start(timeOut = null) {
        if (timeOut) {
            this._timeOut = timeOut;
        }
        this._startTime = this._timer.timestamp();
        this._timer.start(this.tickInterval, this._tick.bind(this));
    }

    _tick() {
        let entity = this._createEntity();
        if (entity.isExpired) {
            this._timeExpired(entity);
        }
        if (typeof this._onTick === 'function') {
            this._onTick(entity);
        }
    }

    _timeExpired(entity) {
        this.stop();
        if (typeof this._onExpire === 'function') {
            this._onExpire(entity);
        }
    }

    _createEntity() {
        let entity = {
            now: this._timer.timestamp(),
            startTime: this._startTime,
            timeOut: this._timeOut,
            rest: undefined,
            isExpired: undefined

        };
        entity.rest = entity.now - entity.startTime;
        entity.isExpired = entity.rest > entity.timeOut;
        return entity
    }
}
