import HCaptcha from "@hcaptcha/react-hcaptcha";
import { useId } from "react";
import { FieldValues, UseFormSetValue } from "react-hook-form";

type CaptchaProps<T extends FieldValues> = {
  refs: any;
  setValue: UseFormSetValue<T> | any;
  ServerError: string;
  t: any;
  id: any;
};
function Captcha<T extends FieldValues>({
  refs,
  setValue,
  ServerError,
  id,
}: CaptchaProps<T>) {
  const uniqueID = useId();

  return (
    <div>
      <HCaptcha
        ref={refs}
        id={uniqueID}
        size="invisible"
        sitekey={import.meta.env.VITE_HCAPTCHA_KEY}
        onVerify={() => setValue("not_ropot", "yes")}
        onExpire={() => setValue("not_ropot", "no")}
      />{" "}
      {ServerError && (
        <p className=" text-xs text-error">
          {
            //!--- server errors --------
            ServerError
          }
        </p>
      )}
    </div>
  );
}

export default Captcha;
