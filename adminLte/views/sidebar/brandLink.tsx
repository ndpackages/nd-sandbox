import React from 'react';

export default function BrandLinkView(props) {
    return (
        <a href="#" className="brand-link">
            {props.logo}
            {/* <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo"
                     className="brand-image img-circle elevation-3" style={{opacity: ".8"}}/>*/}
            <span className="brand-text font-weight-light">{props.text}</span>
        </a>
    );
}
