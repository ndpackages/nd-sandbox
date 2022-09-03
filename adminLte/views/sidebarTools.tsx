import React from 'react';

export default function SideBarToolsView(props) {
    return (
        <aside className="control-sidebar control-sidebar-dark" style={{display: "none"}}>
            <div className="p-3">
                <h5>{props.title}</h5>
                {props.content}
            </div>
        </aside>
    );
}
