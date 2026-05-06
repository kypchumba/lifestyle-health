export default function SectionWrapper({ children, className = "", innerClassName = "" }) {
  return (
    <section className={`py-14 sm:py-16 lg:py-20 ${className}`}>
      <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${innerClassName}`}>
        {children}
      </div>
    </section>
  );
}
