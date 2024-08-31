import Footer from "./Footer.tsx";
import Navbar from "./Navbar.tsx";
import { Outlet, useLocation } from "react-router-dom";
import { LogOutPopUp, LoginPopUp } from "../MainComponents/index.js";
import { useTranslation } from "react-i18next";
import ScrollToTop from "./ScrollToTop.tsx";
import { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorBoundaryFallback } from "../SubComponents/index.ts";
function Layout() {
  const { t } = useTranslation("LayoutComponents");
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);
  return (
    <>
      <LoginPopUp t={t} />
      <LogOutPopUp t={t} />
      <ScrollToTop />
      <Navbar />
      <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
        <main className="min-h-[calc(100vh-96px)] pt-24">
          <Outlet />
        </main>
      </ErrorBoundary>
      <Footer />
    </>
  );
}

export default Layout;
