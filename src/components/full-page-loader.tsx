import { Loader2 } from 'lucide-react';

type Props = {};

export function FullPageLoader({}: Props) {
  return (
    <div className='w-screen bg-black/30 z-10 h-full absolute top-0 left-0 flex justify-center items-center'>
      <Loader2 className='animate-spin text-primary' size={40} />
    </div>
  );
}
