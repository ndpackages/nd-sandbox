import TimeAgo from 'javascript-time-ago';
import ru from 'javascript-time-ago/locale/ru.json';

TimeAgo.addDefaultLocale(ru);

const timeAgo = new TimeAgo([]);

export default timeAgo;
