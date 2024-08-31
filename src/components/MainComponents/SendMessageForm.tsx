import { useExternalData, usePostData } from "@/Hooks/useAxios";
import { useForm } from "react-hook-form";
import { useRef } from "react";
import {
  EmailComponent,
  MessageComponent,
  PhoneComponent,
  Captcha,
  SubmitBtnComponent,
  TextComponent,
} from "../FormComponents/index.js";
import { useAppSelector } from "@/app/reduxHooks.ts";
import { TFunction } from "i18next";
import { userData } from "@/app/Features/AuthenticationSlice.js";
import RatingComponent from "../SubComponents/RatingComponent.js";
import { defaultData } from "../../../src/Utilities/style.js";

type SendMessageFormProps = {
  type: string;
  api: string;
  params: { [index: string]: string };
  t: TFunction;
  showRating?: boolean;
  Bgcolor?: "light" | "dark";
};

type FormValues = {
  name: string;
  phone: number | string;
  email: string | number;
  message?: string;
  starts?: number;
  not_ropot: string;
  from: string;
};

function SendMessageForm({
  type,
  api,
  params,
  t,
  showRating = false,
  Bgcolor = "light",
}: SendMessageFormProps) {
  const captchaRef = useRef(null);
  const user = useAppSelector(userData);
  const { data: externalData } = useExternalData();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, dirtyFields },
    reset,
    setValue,
    watch,
  } = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      name: user?.token
        ? user?.data?.first_name + " " + user?.data?.last_name
        : "",
      phone: user?.token ? user?.data?.phone : "",
      email: user?.token ? user?.data?.email : "",
      message: "",
      not_ropot: "no",
      starts: 0,
      from: "Web",
    },
  });
  const not_ropot = watch("not_ropot");
  const starts = watch("starts");

  const {
    mutate,
    isPending,
    error: ServerErrors,
  } = usePostData(true, () => {
    captchaRef?.current?.resetCaptcha();
    reset();
    setValue("not_ropot", "no");
  });

  const onSubmit = (data: FormValues) => {
    if (not_ropot === "no") {
      captchaRef?.current?.execute();
    } else {
      const finalData =
        type === "PropertyDetails__Comment"
          ? { ...data, ...params }
          : { ...data, ...params };
      mutate({ api: api, data: finalData });
    }
  };

  return (
    <form
      method="post"
      onSubmit={handleSubmit(onSubmit)}
      className="add__comment--form mt-7 w-full flex flex-col justify-start  gap-2  "
    >
      <div className="add__comment--form--top w-full flex justify-between items-start md:flex-col gap-6 md:gap-2 md:justify-start">
        {/**  Name  && Phone &&  Email*/}

        <div className="w-1/2 md:w-full flex flex-col items-start gap-1">
          {/**  Name  */}

          <TextComponent
            color={defaultData.color}
            t={t}
            register={register}
            name="name"
            dirtyFields={dirtyFields}
            Bgcolor={Bgcolor}
            placeholder={t("SendMessageForm.name.placeholder")}
            errors={errors}
            ServerErrors={ServerErrors?.response?.data?.errors?.name?.[0]}
            className={"w-full"}
            confirmFor
            //disabled={!!user?.token}
          />
          {/** Phone  */}

          <PhoneComponent
            color={defaultData.color}
            t={t}
            register={register}
            placeholder={t("SendMessageForm.phone.placeholder")}
            name="phone"
            dirtyFields={dirtyFields}
            withIcon
            errors={errors}
            Bgcolor={Bgcolor}
            ServerErrors={ServerErrors?.response?.data?.errors?.phone?.[0]}
            className="w-full my"
            confirmFor
            //disabled={!!user?.token}
          />

          {/** Email  */}

          <EmailComponent
            color={defaultData.color}
            t={t}
            register={register}
            placeholder={t("SendMessageForm.email.placeholder")}
            name="email"
            dirtyFields={dirtyFields}
            Bgcolor={Bgcolor}
            errors={errors}
            ServerErrors={ServerErrors?.response?.data?.errors?.email?.[0]}
            className="w-full"
            confirmFor
            //disabled={!!user?.token}
          />
        </div>
        {/**  Message*/}
        <div className="w-1/2 md:w-full ">
          <MessageComponent
            t={t}
            register={register}
            placeholder={t("SendMessageForm.message.placeholder")}
            dirtyFields={dirtyFields}
            Bgcolor={Bgcolor}
            name="message"
            errors={errors}
            ServerErrors={ServerErrors?.response?.data?.errors?.message?.[0]}
            rows={showRating ? 5 : 7}
            confirmFor
          />
          {showRating && (
            <RatingComponent
              placeholder={t("SendMessageForm.RatingComponent.placeholder")}
              rating={starts}
              setValue={setValue}
              stateName="starts"
              className="mt-3"
            />
          )}
        </div>
      </div>

      <Captcha
        refs={captchaRef}
        setValue={setValue}
        ServerError={
          ServerErrors?.response?.data?.errors?.not_ropot?.[0]
            ? ServerErrors?.response?.data?.errors?.not_ropot?.[0]
            : null
        }
        t
        id
      />
      {/** Submit Button */}

      <SubmitBtnComponent
        disabled={!isValid || isPending}
        isPending={isPending}
        className="mt-2 !w-[48.5%] sm:!w-full"
        value={t("SendMessageForm.SubmitBtnComponent.value")}
      />
    </form>
  );
}

export default SendMessageForm;
