export default function PageSection({ children, primary, title }) {
  return (
    <section
      className={
        primary
          ? "pageSection pageSection__primary"
          : "pageSection pageSection__secondary"
      }
    >
      <div
        className="
      flex flex-col w-full items-center justify-between main-max-width p-4  sm:p-6 md:p-8  lg:p-24 
      "
      >
        <h1
          className={`${
            primary ? "text-secondary" : "text-primary"
          } text-center text-5xl mb-8 lg:mb-16 lg:text-7xl`}
        >
          {title}
        </h1>
        {children}
      </div>
    </section>
  );
}
