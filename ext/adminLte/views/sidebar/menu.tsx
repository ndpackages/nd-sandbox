import React from 'react';
import {Link} from "react-router-dom";

export default function MenuView(props) {
    return (
        <nav className="mt-2">
            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu"
                data-accordion="false">
                {props.collection.map(function (menuItem, index) {
                    let icon = menuItem.icon ?? 'far fa-circle nav-icon';
                    return (
                        <li key={index} className="nav-item">
                            <Link to={menuItem.uri} className="nav-link">
                                <i className={icon}/>
                                <p>{menuItem.title}</p>
                            </Link>
                        </li>
                    );
                })}


                {/*<li className="nav-item menu-open">
                    <a href="#" className="nav-link active">
                        <i className="nav-icon fas fa-tachometer-alt"/>
                        <p>
                            Starter Pages
                            <i className="right fas fa-angle-left"/>
                        </p>
                    </a>
                    <ul className="nav nav-treeview">
                        <li className="nav-item">
                            <a href="#" className="nav-link active">
                                <i className="far fa-circle nav-icon"/>
                                <p>Active Page</p>
                            </a>
                        </li>
                    </ul>
                </li>
                <li className="nav-item">
                    <a href="#" className="nav-link">
                        <i className="nav-icon fas fa-th"/>
                        <p>
                            Simple Link
                            <span className="right badge badge-danger">New</span>
                        </p>
                    </a>
                </li>*/}


            </ul>
        </nav>
    );
}
