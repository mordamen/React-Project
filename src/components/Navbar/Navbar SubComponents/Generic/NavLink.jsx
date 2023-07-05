import { NavLink } from "react-router-dom";
import { Button, MenuItem, Typography } from "@mui/material";
import { Fragment } from "react";

const NavLinkComponent = ({ isMenuOrLink, url, label, handleCloseMenu, icon,...rest }) => {

  return (
    <Fragment>
    {isMenuOrLink ? 
      <MenuItem
          onClick={handleCloseMenu}
      >
        {icon}
        <NavLink to={url} {...rest}>
          {({ isActive }) => (
            <Typography
              sx={{mx: 1}}
              color={isActive ? "warning.main" : "text.primary"}
            >
              {label}
            </Typography>
          )}
        </NavLink>
      </MenuItem> :
      <Button
        onClick={handleCloseMenu}
        sx={{ my: 2, display: 'block' }}
      >
        <NavLink to={url} {...rest}>
          {({ isActive }) => (
            <Typography
              color={isActive ? "warning.main" : "text.primary"}
            >
              {label}
            </Typography>
          )}
        </NavLink>
      </Button>
    }
    </Fragment>
  );
};

export default NavLinkComponent;