import React from "react";

export function BlogPageLayout({
  main,
  right,
}: {
  main: React.ReactNode;
  right: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col lg:flex-row">
      {/* main content - same layout as PortfolioPageLayout */}
      <div className="flex-auto max-w-xl lg:mx-auto min-w-0 flex flex-col px-4 lg:px-0">
        {main}
      </div>

      {/* right sidebar */}
      <div className="w-full px-4 mt-8 lg:absolute md:w-[300px] xl:w-[330px] lg:right-0 lg:pr-4 lg:mt-0">
        {right}
      </div>
    </div>
  );
}

export function PortfolioPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex-auto max-w-xl lg:mx-auto min-w-0 flex flex-col px-4 lg:px-0">
      {children}
    </div>
  );
}
