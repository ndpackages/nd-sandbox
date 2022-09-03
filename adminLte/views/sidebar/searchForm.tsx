import React from 'react';

export default function SearchFormView(props) {
    return (
        <div className="form-inline">
            <div className="input-group" data-widget="sidebar-search">
                <input className="form-control form-control-sidebar" type="search" placeholder="Search"
                       aria-label="Search"/>
                <div className="input-group-append">
                    <button className="btn btn-sidebar">
                        <i className="fas fa-search fa-fw"></i>
                    </button>
                </div>
            </div>
            <div className="sidebar-search-results">
                <div className="list-group"><a href="#" className="list-group-item">
                    <div className="search-title"><strong className="text-light"></strong>N<strong
                        className="text-light"></strong>o<strong className="text-light"></strong>
                        <strong className="text-light"></strong>e<strong
                            className="text-light"></strong>l<strong
                            className="text-light"></strong>e<strong
                            className="text-light"></strong>m<strong
                            className="text-light"></strong>e<strong
                            className="text-light"></strong>n<strong
                            className="text-light"></strong>t<strong className="text-light"></strong>
                        <strong className="text-light"></strong>f<strong
                            className="text-light"></strong>o<strong
                            className="text-light"></strong>u<strong
                            className="text-light"></strong>n<strong
                            className="text-light"></strong>d<strong
                            className="text-light"></strong>!<strong className="text-light"></strong>
                    </div>
                    <div className="search-path"></div>
                </a></div>
            </div>
        </div>
    );
}
