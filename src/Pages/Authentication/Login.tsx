import { useFetchData, usePostData } from "@/Hooks/useAxios";
import {
  setId,
  setShowLoginPopUp,
  setToken,
  setUserData,
} from "@/app/Features/AuthenticationSlice";
import { useAppDispatch } from "@/app/reduxHooks";
import {
  CheckBox,
  EmailComponent,
  PasswordComponent,
  Captcha,
  SubmitBtnComponent,
} from "@/components/FormComponents";
import {
  Heading,
  HelmetTags,
  LangLink,
  SubHeading,
} from "@/components/MainComponents";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import SendCodeForm from "./SendCodeForm";
import VerificationCodeForm from "./VerificationCodeForm";
import ForgetPasswordForm from "./ForgetPasswordForm";
import { PasswordType } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
export type LoginFormValues = {
  email: string;
  password: PasswordType;
  not_ropot: string;

  created_from: string;
  remember_me: boolean;
};
export type SelectableForms =
  | "SendCodeForm"
  | "VerificationCodeForm"
  | "ForgetPasswordForm";
export type OperationTypes = "verify_code" | "forget_password" | "";

export function Component() {
  const { t, i18n } = useTranslation("Pages_Login");
  const { data: SEO_DATA } = useFetchData(
    "SEO_DATA_login",
    `${import.meta.env.VITE_GET_SEO_DATA}/login`
  );
  const dispatchRedux = useAppDispatch();

  const [openAlertDialog, setOpenAlertDialog] = useState<boolean>(false);
  const [selectedFormToDisplay, setSelectedFormToDisplay] =
    useState<SelectableForms>("SendCodeForm");
  const [operationType, setOperationType] = useState<OperationTypes>("");
  const [verificationCode, setVerificationCode] = useState<number | string>("");

  const captchaRef = useRef(null);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, dirtyFields },
    reset,
    setValue,
    watch,
  } = useForm<LoginFormValues>({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      not_ropot: "no",
      created_from: "web",
      remember_me: false,
    },
  });

  const not_ropot = watch("not_ropot");
  const email = watch("email");

  const { mutate: requestNewCode } = usePostData();

  const {
    mutate: postLoginData,
    isPending,
    error: ServerErrors,
  } = usePostData(
    true,
    (data) => {
      //*the navigate doesnt work from on success, whereas we set the local storage and dispatch with the user data, so th component will rerender then detect that there is a user or token so it will redirect to the homepage from the protected route redirectPath and wont take in considration the navigate whereas it will redirect before navigating
      captchaRef?.current?.resetCaptcha();
      setValue("not_ropot", "no");
      localStorage.setItem("userData", JSON.stringify(data?.data));
      localStorage.setItem("Token", JSON.stringify(data?.data?.token));
      //  ! send id to local
      localStorage.setItem("Id", JSON.stringify(data?.data?.data?.id));
      dispatchRedux(setUserData(data?.data));
      dispatchRedux(setToken(data?.data?.token));
      //! set id to get it and send it to profile to login
      dispatchRedux(setId(data?.data?.data?.id));
      console.log("this is from login " + data?.data?.data?.id);

      //navigate(`/en`, { replace: true });
      //we nned to clear the cached queires to handle the love btn state of the card
      queryClient.clear();
      //TODO before resetting the data, we need to check for the remmember me, if true save the email and pass in local storage (or encrypt them) before resetting the data

      reset();
      //! if the popup was open before signing in from any way, we need to close it
      dispatchRedux(setShowLoginPopUp(false));

      // setLoggedInSuccess(true);
    },
    false,
    (error) => {
      if (error?.response?.data?.message === "Please Verify Code") {
        requestNewCode({
          api: import.meta.env.VITE_SEND_CODE_TO_EMAIL,
          data: {
            email: email,
            not_ropot: "yes",
            created_from: "web",
            operation_type: "verify_code",
          },
        });

        setOpenAlertDialog(true);
        setOperationType("verify_code");
        setSelectedFormToDisplay("VerificationCodeForm");
      }
    }
  );

  const onSubmit = (data: LoginFormValues) => {
    if (not_ropot === "no") {
      captchaRef?.current?.execute();
    } else {
      //TODO if uou need to exclude the remember me, destructure the rest of the keys in another new object, because we need to use the user data (after a successful login) to handle the remember me
      postLoginData({
        api: import.meta.env.VITE_LOGIN_USER,
        data: data,
      });
    }
  };
  function handleResetStates() {
    setOperationType("");
    setSelectedFormToDisplay("SendCodeForm");
    setOpenAlertDialog(false);
    setVerificationCode("");
  }
  return (
    <section className="flex-center w-full h-screen bg-grey">
      <HelmetTags
        title={t("tab.title")}
        description={SEO_DATA?.description || ""}
        keywords={SEO_DATA?.keywords || ""}
        canonical={`${i18n.language}/login`}
      />

      <form
        method="post"
        onSubmit={handleSubmit(onSubmit)}
        className="login__form  w-2/5 min-w-[550px] md:w-10/12 md:min-w-fit bg-background  border shadow-lg rounded-lg  p-8 flex-col-center "
      >
        <LangLink to="" className="logo  w-36 max-w-[144px] min-w-[144px] ">
          <img src="../assets/logo.png" alt="Lana" />
        </LangLink>
        <Heading className="mt-8 mb-2">{t("LoginForm.heading")}</Heading>
        <SubHeading className="">{t("LoginForm.welcome_msg")}</SubHeading>

        <div className="loginForm_fields--wrapper flex flex-col items-start justify-start gap-2 w-[350px] sm:w-full   mt-5">
          {/** Email  */}

          <EmailComponent
            register={register}
            t={t}
            dirtyFields={dirtyFields}
            name="email"
            className="w-full"
            withIcon
            label={t("LoginForm.email.label")}
            placeholder={t("LoginForm.email.placeholder")}
            errors={errors}
            ServerErrors={ServerErrors?.response?.data?.errors?.email?.[0]}
            confirmFor
          />

          {/** Password  */}
          <PasswordComponent
            t={t}
            register={register}
            dirtyFields={dirtyFields}
            withIcon
            name="password"
            className="w-full"
            label={t("LoginForm.password.label")}
            placeholder={t("LoginForm.password.placeholder")}
            errors={errors}
            ServerErrors={ServerErrors?.response?.data?.errors?.password?.[0]}
            confirmFor
          />

          {/** Remember me & forget password  */}

          <div className="flex w-full items-start justify-between gap-10  md:gap-6 sm:gap-3 ">
            <CheckBox
              register={register}
              name="remember_me"
              label={t("LoginForm.remember_me.label")}
              className="xs:text-sm"
              //value={amenity.id}
            />
            <button
              type="button"
              onClick={() => {
                setOperationType("forget_password");
                setOpenAlertDialog(true);
              }}
              className="text-temp_secondary underline underline-offset-4 xs:text-sm"
            >
              {t("LoginForm.Forgot_password")}
            </button>
          </div>

          <Captcha
            t={t}
            refs={captchaRef}
            setValue={setValue}
            ServerError={
              ServerErrors?.response?.data?.errors?.not_ropot?.[0]
                ? ServerErrors?.response?.data?.errors?.not_ropot?.[0]
                : null
            }
            id
          />
          {/** Submit Button */}

          <SubmitBtnComponent
            disabled={!isValid || isPending}
            isPending={isPending}
            value={t("LoginForm.SubmitBtnComponent.value")}
          />

          <div className="w-full flex justify-center items-center gap-1 text-sm mt-3 text-temp_secondary">
            {t("LoginForm.have_no_account")}
            <LangLink
              to="/register"
              className="font-bold text-base cursor-pointer"
            >
              {t("LoginForm.register")}{" "}
            </LangLink>
          </div>
        </div>
      </form>
      <AlertDialog open={openAlertDialog} onOpenChange={setOpenAlertDialog}>
        <AlertDialogContent className="w-[500px] md:w-10/12 md:min-w-fit min-h-[500px] rounded-lg">
          <FontAwesomeIcon
            onClick={() => {
              setOperationType("");
              setOpenAlertDialog(false);
            }}
            className="fixed z-50 top-10 right-10 text-3xl cursor-pointer text-red-400"
            icon={faCircleXmark}
          />
          <section className=" w-full h-full overflow-hidden relative ">
            <div
              className={`forms_wrapper rounded-lg overflow-hidden transition-transform duration-500 ease-in-out w-full h-[300%] absolute right-0 top-0 ${
                selectedFormToDisplay === "SendCodeForm"
                  ? "translate-y-0"
                  : selectedFormToDisplay === "VerificationCodeForm"
                  ? "-translate-y-1/3"
                  : selectedFormToDisplay === "ForgetPasswordForm"
                  ? "-translate-y-2/3"
                  : "translate-y-0"
              }`}
            >
              <div className="dialog__SendCodeForm w-full h-1/3 flex-col-center bg-slate-50 ">
                {selectedFormToDisplay === "SendCodeForm" && (
                  <>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-xl text-temp_secondary px-8 text-center">
                        {t("SendCodeForm.heading")}
                      </AlertDialogTitle>
                    </AlertDialogHeader>
                    <SendCodeForm
                      emailFromLogin={email}
                      setSelectedFormToDisplay={setSelectedFormToDisplay}
                      setValueFromLogin={setValue}
                      t={t}
                    />
                  </>
                )}
              </div>
              <div className="dialog__VerificationCodeForm w-full h-1/3 flex-col-center bg-slate-100 ">
                {selectedFormToDisplay === "VerificationCodeForm" && (
                  <>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-xl text-temp_secondary px-8 text-center">
                        {t("VerificationCodeForm.heading", {
                          context: operationType,
                        })}
                      </AlertDialogTitle>
                    </AlertDialogHeader>
                    <VerificationCodeForm
                      email={email}
                      setSelectedFormToDisplay={setSelectedFormToDisplay}
                      setVerificationCode={setVerificationCode}
                      setOpenAlertDialog={setOpenAlertDialog}
                      handleVerifyAfterLoginSuccess={handleResetStates}
                      operationType={operationType}
                      t={t}
                    />
                  </>
                )}
              </div>
              <div className="dialog__ForgetPasswordForm w-full h-1/3 flex-col-center bg-slate-200 ">
                {/*                       this check tp prevent the focus from making the forms overlap if any input has a focus
                 */}{" "}
                {selectedFormToDisplay === "ForgetPasswordForm" && (
                  <>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-xl text-temp_secondary px-8 text-center">
                        {t("ForgetPasswordForm.heading")}
                      </AlertDialogTitle>
                    </AlertDialogHeader>
                    <ForgetPasswordForm
                      register={register}
                      email={email}
                      code={verificationCode}
                      handleForgetPasswordSuccess={handleResetStates}
                      t={t}
                    />
                  </>
                )}
              </div>
            </div>
          </section>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
}
