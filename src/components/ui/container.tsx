import type React from "react";

export const Container = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex flex-col gap-6 bg-white p-8">{children}</div>;
};
