import { usePostData } from "@/Hooks/useAxios";
import {
  Captcha,
  EmailComponent,
  SubmitBtnComponent,
} from "@/components/FormComponents";
import { SetValueType } from "@/types";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { SelectableForms } from "./Login";
import { TFunction } from "i18next";

type FormValues = {
  email: string;
  not_ropot: string;
  created_from: string;
  operation_type: string;
};

type SendCodeFormProps = {
  emailFromLogin: string;
  t: TFunction;
  setValueFromLogin: SetValueType;
  setSelectedFormToDisplay: React.Dispatch<
    React.SetStateAction<SelectableForms>
  >;
};
export default function SendCodeForm({
  emailFromLogin,
  t,
  setValueFromLogin,
  setSelectedFormToDisplay,
}: SendCodeFormProps) {
  const captchaRef = useRef(null);

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
      email: emailFromLogin || "",
      not_ropot: "no",
      created_from: "web",
      operation_type: "forget_password",
    },
  });
  const not_ropot = watch("not_ropot");

  const {
    mutate: postSendCodeData,
    isPending,
    error: ServerErrors,
  } = usePostData(true, () => {
    captchaRef?.current?.resetCaptcha();
    setValue("not_ropot", "no");
    setValueFromLogin("email", getValues("email"));
    setSelectedFormToDisplay("VerificationCodeForm");
    reset();
  });

  const onSubmit = (data: FormValues) => {
    if (not_ropot === "no") {
      captchaRef?.current?.execute();
    } else {
      postSendCodeData({
        api: import.meta.env.VITE_SEND_CODE_TO_EMAIL,
        data: data,
      });
    }
  };

  return (
    <form
      method="post"
      onSubmit={handleSubmit(onSubmit)}
      className="  w-full p-8 h-fit  flex flex-col items-start justify-start gap-2 bg-"
    >
      {/** Email  */}

      <EmailComponent
        t={t}
        className={"w-full"}
        register={register}
        dirtyFields={dirtyFields}
        withIcon
        name="email"
        label={t("SendCodeForm.email.label")}
        placeholder={t("SendCodeForm.email.placeholder")}
        errors={errors}
        ServerErrors={ServerErrors?.response?.data?.errors?.email?.[0]}
        confirmFor
      />

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
        value={t("SendCodeForm.SubmitBtnComponent.value")}
      />
    </form>
  );
}
