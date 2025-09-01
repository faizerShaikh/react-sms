import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Heading } from './heading';

type Props = {
  triggerButton: React.ReactNode;
  title: string;
  description: string;
  actionButton: string;
  onConfirm: () => void;
};

export function ConfirmDialog({
  triggerButton,
  title,
  description,
  actionButton,
  onConfirm,
}: Props) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{triggerButton}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            <Heading>{title}</Heading>
          </AlertDialogTitle>
          <AlertDialogDescription className='my-3'>
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className='flex justify-end items-center gap-2'>
          <AlertDialogCancel className='w-auto'>Cancel</AlertDialogCancel>
          <AlertDialogAction className='w-auto' onClick={onConfirm}>
            {actionButton}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
