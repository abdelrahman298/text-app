import { usePostData } from "@/Hooks/useAxios";
import { userData } from "@/app/Features/AuthenticationSlice";
import { useAppSelector } from "@/app/reduxHooks";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Captcha,
  ComboBox,
  EmailComponent,
  MessageComponent,
  NumberComponent,
  PhoneComponent,
  SubmitBtnComponent,
  TextComponent,
} from "../FormComponents";
import { TFunction } from "i18next";

type FormValues = {
  name: string;
  phone: number | string;
  email: string | number;
  starts?: number;
  not_ropot: string;
  offer_type?: string;
  from: string;
  offer?: string | number;
};

type AsideFormProps = {
  params: { vendor_id: number; property_id?: number };
  type: string;
  api: string;
  t: TFunction;
  Bgcolor?: "light" | "dark";
  for_what?: string;
};

function AsideForm({
  params,
  type,
  api,
  t,
  Bgcolor,
  for_what,
}: AsideFormProps) {
  const captchaRef = useRef(null);
  const [submitted, setSubmitted] = useState(false);
  const user = useAppSelector(userData);
  const offerOptions = [
    { title: t("AsideForm.offer_type.Options.for_rent"), id: "for_rent" },
    { title: t("AsideForm.offer_type.Options.for_sale"), id: "for_sale" },
  ];

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
      not_ropot: "no",
      offer_type: "",
      from: "Web",
    },
  });
  const not_ropot = watch("not_ropot");
  const offer_type = watch("offer_type");

  const {
    mutate,
    isPending,
    error: ServerErrors,
    isSuccess,
  } = usePostData(true, () => {
    captchaRef?.current?.resetCaptcha();
    reset();
    setValue("not_ropot", "no");
    setSubmitted(false);
  });

  const onSubmit = (data: FormValues) => {
    setSubmitted(true);

    if (not_ropot === "no") {
      captchaRef?.current?.execute();
    } else {
      if (for_what !== "for_both") {
        mutate({
          api: api,
          data: {
            ...data,
            ...params,
            offer_type: for_what,
            offer: (data?.offer as string)?.replace(/,/g, ""),
          },
        });
      } else {
        mutate({
          api: api,
          data: {
            ...data,
            ...params,
            offer: (data?.offer as string)?.replace(/,/g, ""),
          },
        });
      }
    }
  };

  return (
    <form
      method="post"
      onSubmit={handleSubmit(onSubmit)}
      className="add__comment--form  w-full flex flex-col justify-start  gap-2  "
    >
      {/**  Name  && Phone &&  Email*/}
      {/**  Name  */}

      <TextComponent
        register={register}
        name="name"
        placeholder={t("AsideForm.name.placeholder")}
        errors={errors}
        dirtyFields={dirtyFields}
        ServerErrors={ServerErrors?.response?.data?.errors?.name?.[0]}
        Bgcolor={Bgcolor}
        withIcon
        className={"w-full"}
        t={t}
        confirmFor
        //disabled={!! u !!}ser?.token}
      />
      {/** Phone  */}
      <PhoneComponent
        name="phone"
        register={register}
        placeholder={t("AsideForm.phone.placeholder")}
        errors={errors}
        dirtyFields={dirtyFields}
        ServerErrors={ServerErrors?.response?.data?.errors?.phone?.[0]}
        className="w-full"
        Bgcolor={Bgcolor}
        withIcon
        t={t}
        confirmFor
        //disabled={!! u !!}ser?.token}
      />
      {/** Email  */}
      <EmailComponent
        register={register}
        placeholder={t("AsideForm.email.placeholder")}
        errors={errors}
        dirtyFields={dirtyFields}
        ServerErrors={ServerErrors?.response?.data?.errors?.email?.[0]}
        className="w-full"
        Bgcolor={Bgcolor}
        withIcon
        name="email"
        t={t}
        confirmFor
        //disabled={!!user?.token}
      />
      {type == "message" ? (
        <MessageComponent
          register={register}
          placeholder={t("AsideForm.message.placeholder")}
          errors={errors}
          dirtyFields={dirtyFields}
          ServerErrors={ServerErrors?.response?.data?.errors?.message?.[0]}
          rows={7}
          name="message"
          withIcon
          Bgcolor={Bgcolor}
          t={t}
          confirmFor
        />
      ) : type == "offer" ? (
        <>
          <NumberComponent
            register={register}
            errors={errors}
            ServerErrors={ServerErrors?.response?.data?.errors?.offer?.[0]}
            dirtyFields={dirtyFields}
            name="offer"
            placeholder={t("AsideForm.offer.placeholder")}
            className="w-full"
            setValue={setValue}
            withIcon
            Bgcolor={Bgcolor}
            icon={"offer"}
            t={t}
            confirmFor
          />
          {for_what === "for_both" && (
            <div className="flex w-full flex-col items-start text-lg justify-center gap-2">
              <ComboBox
                selectBox
                setValue={setValue}
                data={offerOptions}
                placeholder={t("AsideForm.offer_type.placeholder")}
                stateName={"offer_type"}
                isSuccess={isSuccess}
                light={Bgcolor === "dark"}
              />
              {submitted && offer_type === "" && (
                <p className="pt-2 text-xs text-red-500">
                  {t("AsideForm.offer_type.err_msg")}
                </p>
              )}
              {
                //!--- server errors --------
                ServerErrors?.response?.data?.errors?.offer_type && (
                  <p className="pt-2 text-xs text-red-500">
                    {ServerErrors?.response?.data?.errors?.offer_type[0]}
                  </p>
                )
              }
            </div>
          )}
        </>
      ) : (
        ""
      )}

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
        disabled={
          !isValid ||
          (offer_type === "" && for_what === "for_both" && type == "offer") ||
          isPending
        }
        className={`${
          for_what !== "for_both" && type == "offer" ? "mt-0" : ""
        }`}
        isPending={isPending}
        value={t("AsideForm.SubmitBtnComponent.value", { context: type })}
      />
    </form>
  );
}

export default AsideForm;
