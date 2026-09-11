export default function WelcomeBanner({ name, tagline, illustration }) {
  const hasTagline = Boolean(tagline);

  return (
    <div className="relative isolate overflow-hidden  px-5 py-6 sm:px-8 lg:min-h-[290px]">
      

      <div className="relative z-10 max-w-[420px] pt-2">
        <p className="mb-5 text-[2.15rem] font-bold leading-[0.95] tracking-[-0.05em] text-[#0f1b39] sm:text-[3rem] lg:text-[2rem]">
          Welcome,
        </p>
        <h1 className="mb-6 mt-1 text-[2.15rem] font-bold leading-[0.95] tracking-[-0.05em] text-brand-600 sm:text-[3rem] lg:text-[3rem]">
          {name}
        </h1>
        {hasTagline && (
          <p className="mt-4 max-w-[300px] text-sm font-bold leading-6 text-[#0f1b39] sm:text-base lg:text-md">
            {tagline}
          </p>
        )}
      </div>

      {illustration && (
        <div className="pointer-events-none absolute inset-y-0 right-0 w-[46%] sm:w-[42%] lg:w-[38%]">
          {illustration}
        </div>
      )}
    </div>
  );
}
