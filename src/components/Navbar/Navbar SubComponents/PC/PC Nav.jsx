import { Fragment } from "react";

import PCSiteBranding from "./PC Site Branding";
import PageLinks from "./PageLinks";

function PCNav() {

    return (
        <Fragment>
            <PCSiteBranding />
            <PageLinks
                smallScreen='none' 
                mediumScreen='flex'/>
        </Fragment>
    )
}

export default PCNav;