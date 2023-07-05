import Button from "@mui/material/Button";
import RefreshIcon from "@mui/icons-material/Refresh";
import PropTypes from "prop-types";
import Typography from '@mui/material/Typography'

const RefreshButtonComponent = ({ handleRefreshClick }) => {
  const refreshBtnClick = (ev) => {
    handleRefreshClick(ev);
  };
  return (
    <Button
      fullWidth
      variant="contained"
      sx={{ mt: 1, mb: 1 }}
      onClick={refreshBtnClick}
    >
      <RefreshIcon />
      <Typography variant="body1" color="initial">
        Reset Form
      </Typography>
    </Button>
  );
};

RefreshButtonComponent.propTypes = {
  handleRefreshClick: PropTypes.func.isRequired,
};
export default RefreshButtonComponent;
