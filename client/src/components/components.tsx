import { ReactNode } from "react";
export const LoadingContainer = ({ element }: { element: ReactNode }) => {
  return <div className="loading-container">{element}</div>;
};
