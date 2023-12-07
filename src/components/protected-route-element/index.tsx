import { Navigate, useLocation } from "react-router-dom";

import { useAppSelector } from "hooks/useAppSelector";

import { profileSelector } from "store/profile/selectors";

export const ProtectedRouteElement = ({
  element,
}: {
  element: JSX.Element;
}) => {
  const location = useLocation();

  const { authorizated } = useAppSelector(profileSelector);

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
