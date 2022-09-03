import UrlHelper from "../../../ext/html/helpers/UrlHelper";
import {Nav} from "react-bootstrap";
import React from "react";
import {Link} from "react-router-dom";

function Item(props) {
    let currentUrl = '/' + UrlHelper.trim(window.location.hash);
    let item = props.item;

    let isActive = currentUrl === item.route;
    return (
        <Nav.Item>
            <Link
                to={item.route}
                data-rb-event-key={item.route}
                className={"nav-link " + (isActive ? 'active' : '')}
            >
                {item.title}
            </Link>
            {/*<Nav.Link eventKey={item.route} href={uri}>
                {item.title}
            </Nav.Link>*/}
        </Nav.Item>
    );
}

export default Item;
