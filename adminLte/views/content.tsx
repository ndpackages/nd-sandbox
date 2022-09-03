import React from 'react';

export default function ContentView(props) {
    return (
        <div className="content">
            <div className="container-fluid">
                {props.children}
            </div>
        </div>
    );
}
