import React from 'react';

export default function FooterView(props) {
    return (
        <footer className="main-footer">
            <div className="float-right d-none d-sm-inline">
                {props.rightContent}
            </div>
            {props.content}
        </footer>
    );
}
