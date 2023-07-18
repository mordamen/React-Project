import { Fragment } from "react";

import PCSiteBranding from "./PC Site Branding";
import PageLinks from "./PageLinks";
import NavSettings from "../Generic/NavBar Functions";

function PCNav() {

    return (
        <Fragment>
            <PCSiteBranding />
            <PageLinks
                smallScreen='none' 
                mediumScreen='flex'/>
            <NavSettings />
        </Fragment>
    )
}

export default PCNav;