import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { profileSelector } from "store/profile/selectors";

export const ProtectedRouteElement = ({
  element,
}: {
  element: JSX.Element;
}) => {
  const { authorizated } = useSelector(profileSelector);

  const elementName = element.type.name;

  if (
    (!authorizated && elementName === "Profile") ||
    (authorizated && (elementName === "Login" || elementName === "Register"))
  ) {
    return <Navigate to="/" replace />;
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
