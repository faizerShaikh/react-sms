import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import React from "react";

const helpTextVariants = cva("text-[11px] leading-[12px] md:leading-[14px]", {
  variants: {
    variant: {
      default: "text-helper",
      destructive: "text-destructive",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type Props = {
  children: React.ReactNode;
  error: boolean;
  dataRef?: string;
  className?: string;
};

export const HelpText = ({ error, dataRef, className, children }: Props) => {
  return (
    <span
      data-ref={`${dataRef}.help-text`}
      className={cn(
        helpTextVariants({ variant: error ? "destructive" : "default" }),
        className
      )}
    >
      {children}
    </span>
  );
};
