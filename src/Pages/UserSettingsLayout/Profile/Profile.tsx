import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useOutletContext } from "react-router-dom";
import { useHandleLogOut } from "@/Utilities";
import { usePostData } from "@/Hooks/useAxios";
import {
  Heading,
  HeadingUnderline,
  HelmetTags,
} from "@/components/MainComponents";
import {
  Captcha,
  EmailComponent,
  PasswordComponent,
  PhoneComponent,
  SubmitBtnComponent,
  TextComponent,
  UploadFileComponent,
} from "@/components/FormComponents";
import { PasswordType } from "@/types";

type FormValues = {
  image: string | null;
  current_password: PasswordType;
  new_password: PasswordType;
  confirm_new_password: PasswordType;
  first_name: string;
  last_name: string;
  phone: number | string;
  email: string;
  not_ropot: string;
  created_from: string;
};
export function Component() {
  const { t } = useTranslation("Pages_Profile");
  const queryClient = useQueryClient();

  const captchaRef = useRef(null);
  const [values, setValues] = useState<FormValues>();
  const [reCAPTCHAServerError, setReCAPTCHAServerError] = useState("");
  const [userProfileData, refetchUserProfileData] = useOutletContext();
  const [logOut] = useHandleLogOut();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, dirtyFields },
    getValues,
    watch,
    setValue,
  } = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      image: "",
      current_password: "",
      new_password: "",
      confirm_new_password: "",
      first_name: "",
      last_name: "",
      phone: "",
      email: "",
      not_ropot: "no",
      created_from: "web",
    },
    values,
  });
  useEffect(() => {
    if (userProfileData) {
      setValues({
        ...userProfileData,
        not_ropot: "no",
        created_from: "web",
        image: null,
      });
    }
  }, [userProfileData]);

  const {
    mutate: updateImg,
    isPending: updateImgIsPending,
    error: updateImgServerErrors,
  } = usePostData(true, () => {
    captchaRef?.current?.resetCaptcha();

    setValue("not_ropot", "no");
    setValue("image", "");
    refetchUserProfileData();

    //queryClient.invalidateQueries("userData");
    queryClient.invalidateQueries({ queryKey: ["userData"] });
  });
  const {
    mutate: updateProfile,
    isPending: updateProfileIsPending,
    error: updateProfileServerErrors,
  } = usePostData(true, () => {
    captchaRef?.current?.resetCaptcha();

    setValue("not_ropot", "no");
    refetchUserProfileData();
  });
  const {
    mutate: updatePassword,
    isPending: updatePasswordIsPending,
    error: updatePasswordServerErrors,
  } = usePostData(true, () => {
    logOut();
  });

  const not_ropot = watch("not_ropot");
  const image = watch("image");
  const current_password = watch("current_password");
  const new_password = watch("new_password");
  const confirm_new_password = watch("confirm_new_password");
  const first_name = watch("first_name");
  const last_name = watch("last_name");
  const phone = watch("phone");
  const email = watch("email");
  const disabled =
    //!isValid ||
    updateImgIsPending ||
    updateProfileIsPending ||
    updatePasswordIsPending ||
    ((image === "" || image === null || image?.length === 0) &&
      current_password === "" &&
      new_password === "" &&
      confirm_new_password === "" &&
      first_name === userProfileData?.first_name &&
      last_name === userProfileData?.last_name &&
      phone === userProfileData?.phone &&
      email === userProfileData?.email);

  const onSubmit = (data: FormValues) => {
    if (not_ropot === "no") {
      captchaRef?.current?.execute();
    } else {
      //!the additional check for  !== null because the setValue sets the image to null, and we set it to null because it will be undefined when the values overwrite the defaultValues, and if we set it to "" the isValid will be false which disables the submit button (strange behavior )

      if (image !== "" && image !== null && image?.length !== 0) {
        updateImg({
          api: import.meta.env.VITE_USER_PROFILE_UPDATE_IMG,
          data: {
            image: data?.image?.[0],
            image_key: "main",
            not_ropot: data?.not_ropot,
            created_from: "web",
          },
          file: true,
        });
      }

      if (
        current_password !== "" &&
        new_password !== "" &&
        confirm_new_password !== ""
      ) {
        updatePassword({
          api: import.meta.env.VITE_USER_PROFILE_UPDATE_PASSWORD,
          data: {
            current_password: data?.current_password,
            new_password: data?.new_password,
            confirm_new_password: data?.confirm_new_password,
            not_ropot: data?.not_ropot,
            created_from: "web",
          },
        });
      }

      if (
        first_name !== userProfileData?.first_name ||
        last_name !== userProfileData?.last_name ||
        phone !== userProfileData?.phone ||
        email !== userProfileData?.email
      ) {
        const finalData =
          email !== userProfileData?.email
            ? {
                first_name: data?.first_name,
                last_name: data?.last_name,
                phone: data?.phone,
                email: data?.email,
              }
            : {
                first_name: data?.first_name,
                last_name: data?.last_name,
                phone: data?.phone,
              };
        updateProfile({
          api: `${import.meta.env.VITE_USER_PROFILE_UPDATE_PROFILE}/${
            import.meta.env.VITE_SINGLE_USER_DETAIL
          }`,
          data: {
            ...finalData,
            not_ropot: data?.not_ropot,
            created_from: "web",
          },
        });
      }
    }
  };

  useEffect(() => {
    if (updateImgServerErrors?.response?.data?.errors?.not_ropot?.[0]) {
      setReCAPTCHAServerError(
        updateImgServerErrors?.response?.data?.errors?.not_ropot[0]
      );
    } else if (
      updateProfileServerErrors?.response?.data?.errors?.not_ropot?.[0]
    ) {
      setReCAPTCHAServerError(
        updateProfileServerErrors?.response?.data?.errors?.not_ropot[0]
      );
    } else if (
      updatePasswordServerErrors?.response?.data?.errors?.not_ropot?.[0]
    ) {
      setReCAPTCHAServerError(
        updatePasswordServerErrors?.response?.data?.errors?.not_ropot[0]
      );
    } else setReCAPTCHAServerError("");
  }, [
    updateImgServerErrors,
    updateProfileServerErrors,
    updatePasswordServerErrors,
  ]);

  return (
    <section className="w-full pb- ">
      <HelmetTags
        title={`${userProfileData?.name || ""} ${t("tab.title")}`}
        description={`${userProfileData?.name || ""} ${t("tab.description")}`}
        index={false}
      />
      <Heading className="text-center mb-5">{t("heading")}</Heading>

      <form
        encType="multipart/form-data"
        method="post"
        onSubmit={handleSubmit(onSubmit)}
        className="Profile--form  w-full  flex flex-col gap-16  p-8 bg-grey rounded-lg"
      >
        <div className="Profile__form--top--img flex-col-center ss:its">
          <HeadingUnderline className="text-xl  mb-6 ss:text-start ss:w-full">
            {t("form.headings.img")}{" "}
          </HeadingUnderline>

          <UploadFileComponent
            register={register}
            errors={errors}
            ServerErrors={updateImgServerErrors}
            name="image"
            btnText={t("form.UploadFileComponent_btnText")}
            watch={watch}
            t={t}
            serverFileSrc={userProfileData?.src}
            fileFor="user"
            required={false}
            placeholder=""
            confirmFor
          />
        </div>
        <div className="Profile__form--bottom w-full flex  gap-20 md:gap-9 ss:flex-col-reverse">
          <div className="Profile__form--left--pass w-1/2 ss:w-full  flex flex-col gap-2">
            <HeadingUnderline className="text-xl  mb-6">
              {t("form.headings.pass")}{" "}
            </HeadingUnderline>
            <PasswordComponent
              register={register}
              dirtyFields={dirtyFields}
              t={t}
              name="current_password"
              label={t("form.current_password.label")}
              placeholder={t("form.current_password.placeholder")}
              errors={errors}
              ServerErrors={
                updateProfileServerErrors?.response?.data?.errors
                  ?.current_password?.[0]
              }
              className="w-full"
              Bgcolor="dark"
              getValues={getValues}
              required={false}
              confirmFor
            />
            <PasswordComponent
              t={t}
              register={register}
              dirtyFields={dirtyFields}
              name="new_password"
              label={t("form.new_password.label")}
              placeholder={t("form.new_password.placeholder")}
              errors={errors}
              ServerErrors={
                updateProfileServerErrors?.response?.data?.errors
                  ?.new_password?.[0]
              }
              className="w-full"
              Bgcolor="dark"
              getValues={getValues}
              validations={{
                validate: (value: PasswordType) =>
                  value !== getValues("current_password") ||
                  getValues("current_password") == "",
              }}
              confirmFor="old_vs_new"
              required={false}
            />
            <PasswordComponent
              register={register}
              dirtyFields={dirtyFields}
              name="confirm_new_password"
              t={t}
              label={t("form.confirm_new_password.label")}
              placeholder={t("form.confirm_new_password.placeholder")}
              errors={errors}
              ServerErrors={
                updateProfileServerErrors?.response?.data?.errors
                  ?.confirm_new_password?.[0]
              }
              className="w-full"
              Bgcolor="dark"
              getValues={getValues}
              validations={{
                validate: (value: PasswordType) =>
                  value === getValues("new_password"),
              }}
              required={false}
              confirmFor
            />
            <Captcha
              refs={captchaRef}
              setValue={setValue}
              ServerError={reCAPTCHAServerError}
              t={t}
              id
            />

            {/** Submit Button */}
            <SubmitBtnComponent
              disabled={disabled}
              isPending={
                updateImgIsPending ||
                updateProfileIsPending ||
                updatePasswordIsPending
              }
              value={t("form.SubmitBtnComponent.value")}
              className="w-full mt-7"
            />
          </div>
          <div className="Profile__form--right--info w-1/2 ss:w-full  flex flex-col gap-2">
            <HeadingUnderline className="text-xl  mb-6 truncate">
              {t("form.headings.info")}
            </HeadingUnderline>
            <TextComponent
              t={t}
              register={register}
              dirtyFields={dirtyFields}
              name="first_name"
              label={t("form.first_name.label")}
              placeholder={t("form.first_name.placeholder")}
              errors={errors}
              ServerErrors={
                updateProfileServerErrors?.response?.data?.errors
                  ?.first_name?.[0]
              }
              className="w-full"
              Bgcolor="dark"
              required={false}
              confirmFor
            />

            <TextComponent
              t={t}
              register={register}
              dirtyFields={dirtyFields}
              name="last_name"
              label={t("form.last_name.label")}
              placeholder={t("form.last_name.placeholder")}
              errors={errors}
              ServerErrors={
                updateProfileServerErrors?.response?.data?.errors
                  ?.last_name?.[0]
              }
              className="w-full"
              Bgcolor="dark"
              required={false}
              confirmFor
            />
            <PhoneComponent
              t={t}
              register={register}
              dirtyFields={dirtyFields}
              name="phone"
              label={t("form.phone.label")}
              placeholder={t("form.phone.placeholder")}
              errors={errors}
              ServerErrors={
                updateProfileServerErrors?.response?.data?.errors?.phone?.[0]
              }
              className="w-full"
              Bgcolor="dark"
              required={false}
              confirmFor
            />
            <EmailComponent
              t={t}
              register={register}
              dirtyFields={dirtyFields}
              name="email"
              label={t("form.email.label")}
              placeholder={t("form.email.placeholder")}
              errors={errors}
              ServerErrors={
                updateProfileServerErrors?.response?.data?.errors?.email?.[0]
              }
              className="w-full"
              Bgcolor="dark"
              required={false}
              confirmFor
            />
          </div>
        </div>
      </form>
    </section>
  );
}
