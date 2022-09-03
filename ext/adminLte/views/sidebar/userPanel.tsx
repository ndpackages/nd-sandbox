import React from 'react';
import UserAvatar from "../../../../../pages/user/common/web/widgets/UserAvatar";

export default function UserPanelView(props) {
    return (
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
                {props.avatar}
                {/*<img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2"
                             alt="User Image"/>*/}
            </div>
            <div className="info">
                <a href="#" className="d-block">{props.username}</a>
            </div>
        </div>
    );
}
