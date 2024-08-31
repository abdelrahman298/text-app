import { useTranslation } from "react-i18next";
import { OperationTypes, SelectableForms } from "./Login";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { usePostData } from "@/Hooks/useAxios";
import { useRef } from "react";
import { TFunction } from "i18next";
import {
  Captcha,
  SubmitBtnComponent,
  TextComponent,
} from "@/components/FormComponents";

type VerificationCodeFormProps = {
  email: string;
  t: TFunction;
  from?: string;
  operationType?: OperationTypes;
  setSelectedFormToDisplay?: React.Dispatch<
    React.SetStateAction<SelectableForms>
  >;
  setOpenAlertDialog?: React.Dispatch<React.SetStateAction<boolean>>;
  setVerificationCode?: React.Dispatch<React.SetStateAction<string | number>>;
  handleVerifyAfterLoginSuccess?: () => void;
};
type FormValues = {
  code: string | number;
  not_ropot: string;
  created_from: string;
  operation_type: string;
  email: string;
};

function VerificationCodeForm({
  from,
  email,
  t,
  setOpenAlertDialog,
  setSelectedFormToDisplay,
  setVerificationCode,
  operationType,
  handleVerifyAfterLoginSuccess,
}: VerificationCodeFormProps) {
  const { i18n } = useTranslation("");
  const captchaRef = useRef(null);

  const lang = i18n.language?.startsWith("ar") ? "ar" : "en";
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, dirtyFields },
    reset,
    setValue,
    getValues,
    watch,
  } = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      code: "",
      not_ropot: "no",
      created_from: "web",
      operation_type: operationType,
      email: email,
    },
  });
  const not_ropot = watch("not_ropot");

  const {
    mutate: postCheckCode,
    isPending,
    error: ServerErrors,
  } = usePostData(true, () => {
    captchaRef?.current?.resetCaptcha();
    setValue("not_ropot", "no");
    if (from === "register") {
      setOpenAlertDialog?.(false);

      navigate(`/${lang}/login`, { replace: true });
    } else {
      if (operationType === "verify_code") {
        handleVerifyAfterLoginSuccess?.();
      } else {
        setVerificationCode?.(getValues("code"));
        setSelectedFormToDisplay?.("ForgetPasswordForm");
      }
    }
    reset();
  });

  const onSubmit = (data: FormValues) => {
    if (not_ropot === "no") {
      captchaRef?.current?.execute();
    } else {
      postCheckCode({
        api: import.meta.env.VITE_CHECK_CODE,
        data: data,
      });
    }
  };

  return (
    <form
      method="post"
      onSubmit={handleSubmit(onSubmit)}
      className="  w-full p-8 h-fit  flex flex-col items-start justify-start gap-2"
    >
      {/** Verification Code  */}

      <TextComponent
        t={t}
        register={register}
        className={"w-full"}
        name="code"
        dirtyFields={dirtyFields}
        withIcon
        icon={"code"}
        label={t("VerificationCodeForm.code.label")}
        placeholder={t("VerificationCodeForm.code.placeholder")}
        errors={errors}
        ServerErrors={ServerErrors?.response?.data?.errors?.code?.[0]}
        validations={{
          pattern: /^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,،.<>/?\s]*$/,
        }}
        confirmFor
      />

      <Captcha
        t={t}
        id={11}
        refs={captchaRef}
        setValue={setValue}
        ServerError={
          ServerErrors?.response?.data?.errors?.not_ropot?.[0]
            ? ServerErrors?.response?.data?.errors?.not_ropot?.[0]
            : null
        }
      />
      {/** Submit Button */}

      <SubmitBtnComponent
        disabled={!isValid || isPending}
        isPending={isPending}
        value={t("VerificationCodeForm.SubmitBtnComponent.value")}
      />
      <div className="w-full flex justify-center"></div>
    </form>
  );
}
export default VerificationCodeForm;
