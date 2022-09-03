import UrlHelper from "../../ext/html/helpers/UrlHelper";
import {Nav} from "react-bootstrap";
import React from "react";
import Item from "./views/Item";

function ControlledNavsWidget(props) {
    let currentUrl = '/' + UrlHelper.trim(window.location.hash);
    return (
        <Nav
            className={props.className}
            variant={props['variant'] ?? "tabs"}
            activeKey={currentUrl}
            // onSelect={onSelect}
        >
            {props.collection.map(function (item, index) {
                return (
                    <Item key={index} item={item}/>
                );
            })}
        </Nav>
    );
}

export default ControlledNavsWidget;
