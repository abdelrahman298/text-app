interface IAdContainerProps {
  src: string;
  link: string;
  alt: string;
  title?: string;
  sub_title?: string;
  className?: string;
  alignment?: "vertical" | "horizontal";
}

function AdContainer({
  src,
  title,
  sub_title,
  link,
  alt,
  className,
  alignment = "vertical",
}: IAdContainerProps) {
  //!add the height and it is uppercase for V or H
  return (
    <a
      href={link}
      rel="noreferrer"
      target="_blank"
      className={`group w-full overflow-hidden flex relative flex-col justify-center items-center gap-5 text-background  ${
        alignment === "horizontal" ? "h-[270px]" : "h-fit"
      } ${className}`}
    >
      <img
        loading="lazy"
        className={`absolute  inset-0 -z-20 object- trns group-hover:scale-110 w-full  h-full`}
        src={src}
        alt={alt}
      />
      <div
        className={`ad_bg--overlay -z-10 absolute w-full h-full inset-0 ${
          (title || sub_title) && "bg-black/30"
        } `}
      ></div>
      {title && <h3 className="text-2xl font-medium">{title}</h3>}
      {sub_title && <h4>{sub_title}</h4>}
    </a>
  );
}

export default AdContainer;
