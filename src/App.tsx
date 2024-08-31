import "./SASS/styles.scss";
import { useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { Layout, AuthLayout } from "./components/LayoutComponents";
import SettingsLayout from "./Pages/UserSettingsLayout/SettingsLayout.tsx";
import ProtectedRoutes from "./components/ProtectionComponents/ProtectedRoutes.tsx";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "./app/reduxHooks.ts";
import { lang, setLang } from "./app/Features/MiscellaneousSlice.tsx";
import { userData } from "./app/Features/AuthenticationSlice.tsx";

function App() {
  const { i18n } = useTranslation("");
  const dispatchRedux = useAppDispatch();
  const user = useAppSelector(userData);
  const lng = useAppSelector(lang);
  //!we use startsWith instead of ==== whereas some languages codes consist of 2 words as en-us but the language in the url always consists of one word
  useEffect(() => {
    dispatchRedux(setLang(i18n.language?.startsWith("ar") ? "ar" : "en"));

    document.documentElement.dir = i18n.dir();
    document.documentElement.lang = i18n.language?.startsWith("ar")
      ? "ar"
      : "en";
  }, [dispatchRedux, i18n.language]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Navigate to={`/${i18n.language?.startsWith("ar") ? "ar" : "en"}`} />
      ),
    },
    {
      path: `/${i18n.language?.startsWith("ar") ? "ar" : "en"}`,
      children: [
        //!-------- Pages Layout--------
        {
          element: <Layout />,
          children: [
            {
              index: true,
              lazy: () => import("./Pages/HomePage/HomePage.tsx"),
            },
            {
              path: "search",
              lazy: () => import("./Pages/SearchPage/SearchPage.tsx"),
            },
            {
              path: "search/:asd",
              lazy: () => import("./Pages/SearchPage/SearchPage.tsx"),
            },
            {
              path: "properties/:propertyNumber/*",
              lazy: () => import("./Pages/PropertyDetails/PropertyDetails.tsx"),
            },
            {
              path: "properties",
              lazy: () => import("./Pages/AllProperties/AllProperties.tsx"),
            },
            {
              path: "news",
              lazy: () => import("./Pages/News/News.tsx"),
            },
            {
              path: "news/:newsId",
              lazy: () => import("./Pages/News/NewsDetails.tsx"),
            },
            {
              path: "news/categories/:categoryID",
              lazy: () => import("./Pages/News/CategoryDetails.tsx"),
            },

            {
              path: "Agents",
              lazy: () => import("./Pages/Agents/Agents/Agents.tsx"),
            },
            {
              path: "agents/:agentID/*",
              lazy: () =>
                import("./Pages/Agents/AgentDetails/AgentDetails.tsx"),
            },
            {
              path: "projects",
              lazy: () => import("./Pages/Projects/Projects.tsx"),
            },
            {
              path: "projects/:projectNumber/*",
              lazy: () => import("./Pages/Projects/ProjectDetails.tsx"),
            },
            //!--------SubPages--------

            {
              path: "contact-us",
              lazy: () => import("./Pages/SubPages/ContactUs.tsx"),
            },

            {
              path: "terms-conditions",
              lazy: () => import("./Pages/SubPages/TermsConditions.tsx"),
            },

            {
              path: "about-us",
              lazy: () => import("./Pages/SubPages/About.tsx"),
            },
            {
              path: "faqs",
              lazy: () => import("./Pages/SubPages/FAQs.tsx"),
            },

            //!NotFound
            {
              path: "*",
              lazy: () => import("./components/SubComponents/NotFound.tsx"),
            },
            {
              path: "not-found",
              lazy: () => import("./components/SubComponents/NotFound.tsx"),
            },
          ],
        },
        //!--------Auth / user Pages Layout--------
        {
          element: (
            <ProtectedRoutes isAllowed={user?.token ? true : false}>
              <SettingsLayout />
            </ProtectedRoutes>
          ),

          children: [
            {
              path: "profile",
              lazy: () =>
                import("./Pages/UserSettingsLayout/Profile/Profile.tsx"),
            },
            {
              path: "messages",
              lazy: () =>
                import("./Pages/UserSettingsLayout/Messages/Messages.tsx"),
            },
            {
              path: "reviews",
              lazy: () =>
                import("./Pages/UserSettingsLayout/MyReviews/MyReviews.tsx"),
            },

            // ! remove add property button
            // {
            //   path: "submit-property",
            //   lazy: () =>
            //     import(
            //       "./Pages/UserSettingsLayout/SubmitProperty/SubmitProperty.tsx"
            //     ),
            // },
            {
              path: "my-properties",
              lazy: () =>
                import(
                  "./Pages/UserSettingsLayout/MyProperties/MyProperties.tsx"
                ),
            },
            {
              path: "my-offers",
              lazy: () =>
                import("./Pages/UserSettingsLayout/MyOffers/MyOffers.tsx"),
            },
            {
              path: "my-favorites",
              lazy: () =>
                import(
                  "./Pages/UserSettingsLayout/MyFavorites/MyFavorites.tsx"
                ),
            },
          ],
        },
        //! -------LogIn / Register routes--------
        {
          element: (
            <ProtectedRoutes
              redirectPath={`/${lng}`}
              isAllowed={user?.token ? false : true}
            >
              <AuthLayout />
            </ProtectedRoutes>
          ),
          children: [
            {
              path: "login",
              lazy: () => import("./Pages/Authentication/Login.tsx"),
            },
            {
              path: "register",
              lazy: () => import("./Pages/Authentication/Register.tsx"),
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
  /*   return <RouterProvider router={router} fallbackElement={< Loader />} />;
   */
}

export default App;
