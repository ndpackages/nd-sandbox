import React from 'react';
import {useLocation} from "react-router";
import BrandLinkView from "./brandLink";
import UserPanelView from "./userPanel";
import SearchFormView from "./searchForm";
import MenuView from "./menu";
import adminMenu from "../../../../../app/common/config/adminMenu";
import UserAvatar from "../../../../../pages/user/common/web/widgets/UserAvatar";
import container from "../../../../core/container/singletons/container";

export default function SideBar(props) {

    /*const location = useLocation();
    React.useEffect(() => {
        effect.run()
    }, [location]);*/

    let companyLogo =
        <UserAvatar
            username="asddddddd"
            className="brand-image img-circle elevation-3"
            style={{opacity: ".8"}}
        />;


    let userAvatar = null;
    let tokenEntity = container.get('security.services.userProvider').getTokenEntity();
    let identity = tokenEntity.getIdentity();
    if (tokenEntity.isAuthenticated()) {
        userAvatar =
            <UserAvatar
                username={identity.username}
                className="img-circle elevation-2"
                style={{opacity: ".8"}}
            />;
    }

    return (
        <>
            <BrandLinkView text="AdminLTE 3" logo={companyLogo}/>
            <div className="sidebar">
                {tokenEntity.isAuthenticated() ? (
                    <UserPanelView username={identity.username} avatar={userAvatar}/>
                ) : null}
                <SearchFormView/>
                <MenuView collection={adminMenu}/>
            </div>
        </>
    );
}
