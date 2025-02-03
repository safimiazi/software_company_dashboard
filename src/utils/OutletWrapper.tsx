import { ReactNode } from "react";

const OutletWrapper = ({ children }: { children: ReactNode }) => {
  return <div className="p-6">{children}</div>;
};

export default OutletWrapper;
