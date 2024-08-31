import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";

function AuthLayout() {
  const { t } = useTranslation("AuthLayoutComponents");

  return (
    <>
     
        <Outlet />
    </>
  );
}

export default AuthLayout;
