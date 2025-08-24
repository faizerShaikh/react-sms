import { cn } from "@/lib/utils";

type PowerdByProps = {
  className?: string;
};

export function PowerdBy({ className }: PowerdByProps) {
  return (
    <p
      className={cn(
        `w-full h-full text-neutral-500 font-medium text-center flex justify-center items-center gap-1 bg-white`,
        className
      )}
    >
      Powered by <img src='/quartoloom-logo.png' className='h-4 w-auto' />
    </p>
  );
}
