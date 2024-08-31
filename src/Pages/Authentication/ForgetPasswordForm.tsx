import { usePostData } from "@/Hooks/useAxios";
import {
  Captcha,
  PasswordComponent,
  SubmitBtnComponent,
} from "@/components/FormComponents";
import { PasswordType, TFunction } from "@/types";
import { useRef } from "react";
import { useForm } from "react-hook-form";

type ForgetPasswordFormProps = {
  register: any;
  email: string;
  code: number | string;
  handleForgetPasswordSuccess: () => void;
  t: TFunction | any;
};
type FormValues = {
  email: string;
  code: string | number;
  new_password: PasswordType;
  confirm_new_password: PasswordType;
  not_ropot: string;
  created_from: string;
};

function ForgetPasswordForm({
  email,
  code,
  handleForgetPasswordSuccess,
  t,
}: ForgetPasswordFormProps) {
  const captchaRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, dirtyFields },
    reset,
    getValues,
    setValue,
    watch,
  } = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      email: email,
      code: code,
      new_password: "",
      confirm_new_password: "",
      not_ropot: "no",
      created_from: "web",
    },
  });

  const not_ropot = watch("not_ropot");

  const {
    mutate: postSetPasswordData,
    isPending,
    error: ServerErrors,
  } = usePostData(true, () => {
    captchaRef?.current?.resetCaptcha();
    setValue("not_ropot", "no");
    reset();
    handleForgetPasswordSuccess();
  });

  const onSubmit = (data: FormValues) => {
    if (not_ropot === "no") {
      captchaRef?.current?.execute();
    } else {
      postSetPasswordData({
        api: import.meta.env.VITE_FORGET_PASSWORD,
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
      {/** Password  */}

      <PasswordComponent
        t={t}
        className={"w-full"}
        register={register}
        dirtyFields={dirtyFields}
        withIcon
        name="new_password"
        label={t("ForgetPasswordForm.new_password.label")}
        placeholder={t("ForgetPasswordForm.new_password.placeholder")}
        errors={errors}
        ServerErrors={ServerErrors?.response?.data?.errors?.new_password?.[0]}
        confirmFor
      />
      {/** Confirm Password  */}
      <PasswordComponent
        t={t}
        className={"w-full"}
        register={register}
        dirtyFields={dirtyFields}
        withIcon
        name="confirm_new_password"
        label={t("ForgetPasswordForm.confirm_new_password.label")}
        placeholder={t("ForgetPasswordForm.confirm_new_password.placeholder")}
        errors={errors}
        ServerErrors={
          ServerErrors?.response?.data?.errors?.confirm_new_password?.[0]
        }
        validations={{
          validate: (value: PasswordType) =>
            value === getValues("new_password"),
        }}
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
        value={t("ForgetPasswordForm.SubmitBtnComponent.value")}
      />
    </form>
  );
}
export default ForgetPasswordForm;
