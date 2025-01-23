"use client";

import useIsLoading from "@/hooks/modals/useIsLoading";
import { useEffect } from "react";
import { ThreeCircles } from "react-loader-spinner";

interface LoadingPageProps {
  isLoading?: boolean;
}

function LoadingPage({ isLoading = false }: LoadingPageProps) {
  const pageLoading = useIsLoading();

  if (isLoading) {
    return (
      <div
        className="absolute flex justify-center items-center flex-col z-[99] bg-sea-green-300/50 backdrop-blur-sm"
        style={{
          marginTop: "-.25rem",
          marginLeft: "-.5rem",
          width: "-webkit-fill-available",
          height: "100%",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <ThreeCircles
          visible={true}
          height="120"
          width="120"
          color="#31747b"
          ariaLabel="three-circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }

  return (
    <>
      {pageLoading.isLoading && (
        <div className="fixed flex min-h-screen w-screen justify-center items-center flex-col z-[99] bg-sea-green-300/50 backdrop-blur-sm">
          <ThreeCircles
            visible={true}
            height="150"
            width="150"
            color="#31747b"
            ariaLabel="three-circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      )}
    </>
  );
}

export default LoadingPage;
