import React, { ReactNode, Suspense } from "react";

interface SuspensenItemsProps {
  children: ReactNode;
}

const SuspensenItems: React.FC<SuspensenItemsProps> = ({ children }) => {
  return (
    <Suspense
      fallback={
        <div className="loading-container">
          <img
            src="https://i.giphy.com/jAYUbVXgESSti.webp"
            alt="Loading Cart..."
            className="loading-image"
          />
        </div>
      }
    >
      {children}
    </Suspense>
  );
};

export default SuspensenItems;
