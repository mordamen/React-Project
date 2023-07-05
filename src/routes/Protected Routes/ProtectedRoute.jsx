import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

import ROUTES from "../../routes/ROUTES";

const ProtectedRoute = ({ element }) => {
  //* logic section
  const isLoggedIn = useSelector((bigState) => bigState.authSlice.isLoggedIn);
  //* html section
  if (isLoggedIn) {
    return element;
  } else {
    toast.error("Please login first");
    return <Navigate to={ROUTES.LOGIN} />;
  }
};
export default ProtectedRoute;
