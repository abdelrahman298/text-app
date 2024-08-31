import { cn } from "@/lib/utils";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
interface ISubmitBtnComponentProps {
  value: string;
  disabled?: boolean;
  isPending?: boolean;
  alignment?: "vertical" | "horizontal";
  className?: string;
}

function SubmitBtnComponent({
  value = "Send",
  disabled,
  isPending,
  alignment = "vertical",
  className,
}: ISubmitBtnComponentProps) {
  return (
    <button
      id="custom__btn"
      disabled={disabled}
      className={cn("custom__btn__accent mt-6 ", className)}
      type="submit"
    >
      <span>
        {isPending ? <FontAwesomeIcon icon={faSpinner} spin /> : value}
      </span>
    </button>
  );
}

export default SubmitBtnComponent;
