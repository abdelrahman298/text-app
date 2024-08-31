import { cn } from "@/lib/utils";

function Loader({ className }: { className?: string }) {
  return (
    <section
      className={cn("dots-container flex-center w-full h-full  ", className)}
    >
      <section className="dots-container w-fit">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </section>
    </section>
  );
}
export default Loader;
