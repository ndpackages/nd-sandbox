import TimeAgo from 'javascript-time-ago';
import ru from 'javascript-time-ago/locale/ru.json';

class TimeAgoWrapper {

    private isInit = false;

    format(value) {
        this.init();
        if (!(value instanceof Date)) {
            value = new Date(value);
        }
        const timeAgo = new TimeAgo([]);
        return timeAgo.format(value);
    }

    init() {
        if(!this.isInit) {
            TimeAgo.addDefaultLocale(ru);
            this.isInit = true;
        }
    }
}

export default new TimeAgoWrapper();
