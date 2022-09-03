import React from 'react';
import timeAgo from "../singletons/timeAgo";

export default function TimeAgoWidget(props) {
    return (
        <span>
            {timeAgo.format(props.children)}
        </span>
    );
}
