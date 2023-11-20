import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

import { profileSelector } from "store/profile/selectors";

const ProtectedRouteElement = ({ element }: { element: JSX.Element }) => {
  const location = useLocation();

  const { authorizated } = useSelector(profileSelector);

  const elementName = element.type.name;

  if (
    (!authorizated && elementName === "Profile") ||
    (authorizated && (elementName === "Login" || elementName === "Register"))
  ) {
    return <Navigate to={location?.state?.from || "/"} replace />;
  }

  if (elementName === "ForgotPassword") {
    const resetPasswordStepPassed = localStorage.getItem(
      "resetPasswordStepPassed"
    );

    if (resetPasswordStepPassed === "true") {
      return <Navigate to="/reset-password" replace />;
    }
  }

  if (elementName === "ResetPassword") {
    const resetPasswordStepPassed = localStorage.getItem(
      "resetPasswordStepPassed"
    );

    if (!resetPasswordStepPassed) {
      return <Navigate to="/forgot-password" replace />;
    }
  }

  return element;
};

export default ProtectedRouteElement;
