import { cn } from "@/lib/utils";
import * as React from "react";

function Separator({
  orientation = "horizontal",
  className,
  children,
}: {
  orientation?: "horizontal" | "vertical";
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={cn("flex items-center justify-center relative", className)}>
      {orientation === "vertical" ? (
        <div className='h-full bg-gray-200 w-[0.0625rem] mx-4'>
          <span className='text-gray-500 px-2'>{children}</span>
        </div>
      ) : (
        <div className='w-full bg-gray-200 h-[0.0625rem] my-4 relative'>
          <div className='absolute translate-center top-1/2 left-1/2'>
            <span className='text-gray-500 px-2 bg-[#ffffff]'>{children}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export { Separator };
