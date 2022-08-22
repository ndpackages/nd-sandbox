import React from 'react';
import {useTranslation} from 'react-i18next';
import {NavDropdown} from "react-bootstrap";
import container from "../../../../packages/container/singletons/container";
import LocaleHelper from "../../domain/helpers/LocaleHelper";

import 'admin-lte/plugins/flag-icon-css/css/flag-icons.min.css';

let collection = container.get('language.services.language').all();
// let selectedLanguageEntity = container.language.services.switch.oneSelected();

let languages = [];

for (let code in collection) {
    let languageEntity = collection[code];
    let item = {};
    item["code"] = code;
    item["label"] = languageEntity.nativeName;
    let flagIconCode = LocaleHelper.encode(languageEntity.code);
    item["icon"] = 'flag-icon-' + flagIconCode;
    languages.push(item);
}

const LanguagesDropdown = () => {
    // const [dropdownOpen, setDropdownOpen] = useState(false);
    const {t, i18n} = useTranslation();

    const changeLanguage = (lng) => {
        container.get('language.services.switch').setLocale(lng);
    };

    const getCurrentLanguage = () => {
        const currentLanguage = i18n.language;
        if (currentLanguage) {
            return languages.find(
                (language) => language.code === currentLanguage
            );
        }
        return {};
    };

    const isActiveLanguage = (language) => {
        if (language) {
            return getCurrentLanguage().code === language.code ? 'active' : '';
        }
        return '';
    };

    let title = <i className={`flag-icon ${getCurrentLanguage().icon}`}/>;

    return (
        <NavDropdown title={title} id="languagesDropdown">
            {languages.map((language) => (
                <NavDropdown.Item
                    key={language.code}
                    className={`dropdown-item ${isActiveLanguage(language)}`}
                    onClick={() => {
                        changeLanguage(language.code);
                    }}>
                    <i className={`flag-icon ${language.icon} mr-2`}/>
                    <span>{t(language.label)}</span>
                </NavDropdown.Item>
            ))}
        </NavDropdown>
    );
};

export default LanguagesDropdown;
