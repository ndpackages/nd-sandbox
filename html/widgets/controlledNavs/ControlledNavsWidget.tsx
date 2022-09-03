import UrlHelper from "../../../core/helpers/UrlHelper";
import {Nav} from "react-bootstrap";
import React from "react";
import ControlledNavsItem from "./ControlledNavsItem";

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
                    <ControlledNavsItem key={index} item={item}/>
                );
            })}
        </Nav>
    );
}

export default ControlledNavsWidget;
