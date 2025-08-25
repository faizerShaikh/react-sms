import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
};

export function Heading({ children, variant = "primary" }: Props) {
  return (
    <div className='relative'>
      {variant === "primary" && (
        <span className='absolute top-0 left-0 h-full rounded-l-sm bg-primary w-1' />
      )}
      <p
        className={cn("font-satoshi lg:text-lg text-sm font-bold", {
          "pl-4 py-1 text-heading uppercase": variant === "primary",
          "py-2 text-primary": variant === "secondary",
        })}
      >
        <span className='py-1 uppercase'>{children}</span>
      </p>
    </div>
  );
}
