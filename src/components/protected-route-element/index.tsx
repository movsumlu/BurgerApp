import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

import { profileSelector } from "store/profile/selectors";

const ProtectedRouteElement = ({ element }: { element: JSX.Element }) => {
  const location = useLocation();

  const { authorizated } = useSelector(profileSelector);

  const from = location.state?.from || "/";

  const elementName = element.type.name;

  if (
    (!authorizated && elementName === "Profile") ||
    (authorizated && (elementName === "Login" || elementName === "Register"))
  ) {
    return <Navigate to={from} />;
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
      return <Navigate to="/forgot-password" />;
    }
  }

  return element;
};

export default ProtectedRouteElement;
