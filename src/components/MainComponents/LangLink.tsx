import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

interface LangLinkProps {
  to: string;
  children: React.ReactNode | string;
  className?: string;
  id?: string;
  title?: string;
  replace?: boolean;
  state?: string;
  rel?: string;
  target?: string;
  color?: {
    basic_color?: string;
    secondary_color?: string;
    temp_color?: string;
  };
  textcolor?: string;
}
function LangLink({
  to,
  replace,
  children,
  className,
  id = "",
  title,
  rel,
  target,
  color,
  textcolor,
}: LangLinkProps) {
  const { i18n } = useTranslation();
  const lng = i18n.language?.startsWith("ar") ? "/ar" : "/en";
  return (
    <Link
      rel={rel}
      target={target}
      id={id}
      title={title}
      to={lng + to}
      replace={replace}
      className={className}
      style={{
        backgroundColor: `${color?.secondary_color}`,
        color: `${textcolor}`,
      }}
    >
      {children}
    </Link>
  );
}

export default LangLink;
