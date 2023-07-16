import { Fragment } from "react";

import MobileSiteBranding from "../Mobile/Mobile Site Branding";
import MobileMenu from "./HamburgerIcon";
import ResponsiveDrawer from "./Drawer";

//  On Mobile: 
//      * Hamburger (Navlinks)
//      Empty Space
//      * Site Logo
//      Empty Space
//      * Hamburger (Drawer - Navlinks) / Avatar (Drawer - Navlinks)

function MobileNav() {

    return (
        <Fragment>
            <MobileMenu />
            <MobileSiteBranding />
            {/* <ResponsiveDrawer /> */}
        </Fragment>
    )
}

export default MobileNav;