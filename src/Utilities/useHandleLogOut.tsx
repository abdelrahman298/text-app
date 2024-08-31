import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { usePostData } from "@/Hooks/useAxios";
import { setToggleLogOutPopUp } from "@/app/Features/MiscellaneousSlice";
import {
  userData,
  setUserData,
  setToken,
} from "@/app/Features/AuthenticationSlice";
import { useAppDispatch, useAppSelector } from "@/app/reduxHooks";

export default function useHandleLogOut() {
  const user = useAppSelector(userData);

  const dispatchRedux = useAppDispatch();
  const { i18n } = useTranslation("");
  const lang = i18n.language?.startsWith("ar") ? "ar" : "en";
  const errMsg =
    lang === "ar" ? "برجاء تسجيل الدخول أولا!" : "Please log in first!";
  function ResetAuthStates() {
    localStorage.removeItem("userData");
    localStorage.removeItem("Token");
    dispatchRedux(setUserData(null));
    dispatchRedux(setToken(null));
    dispatchRedux(setToggleLogOutPopUp(false));
    window.location.replace(`/${lang}/login`);
  }
  function ResetAuthStatesWithToast() {
    ResetAuthStates();
    toast.error(errMsg);
  }
  const {
    mutate,
    isPending,
    error: logoutError,
  } = usePostData(
    false,
    () => {
      ResetAuthStates();
    },
    true,
    () => {
      ResetAuthStates();
    }
  );

  function logOut() {
    if (user?.token) {
      mutate({
        api: import.meta.env.VITE_LOGOUT_USER,
      });
    } else {
      toast.error(errMsg);
    }
  }

  return [logOut, isPending, logoutError, ResetAuthStatesWithToast];
}
