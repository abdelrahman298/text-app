import loader from "/assets/main_loader.gif";
function MainLoader() {
  return (
    <section className={`w-full h-screen flex-center bg-[#ffffff]`}>
      <img className="w-40  object-cover" src={loader} alt="main_loader" />
    </section>
  );
}

export default MainLoader;
