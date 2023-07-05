import { Fragment } from "react";

import MobileSiteBranding from "../Mobile/Mobile Site Branding";
import MobileMenu from "./HamburgerIcon";

function MobileNav() {

    return (
        <Fragment>
            <MobileMenu />
            <MobileSiteBranding />
        </Fragment>
    )
}

export default MobileNav;