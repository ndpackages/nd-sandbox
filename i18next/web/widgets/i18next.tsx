import {useTranslation} from "react-i18next";
import React from "react";

const I18next = function (props) {
    const {t} = useTranslation();
    return (
        <>
            {t(props.name)}
        </>
        );
};

export default I18next;
