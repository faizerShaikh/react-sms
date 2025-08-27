import { useIsMobile } from '@/hooks/use-mobile';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useEffect, useState } from 'react';
import { Heading } from './heading';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from './ui/drawer';

type Props = {
  onClose?: () => void;
  heading: string;
  children: (props: { onClose: () => void }) => React.ReactNode;
  autoOpen?: boolean;
  trigger?: React.ReactNode;
  onCloseRef?: React.RefObject<() => void>;
  dialogContentClassName?: string;
};

export function MobileResponsiveDialog({
  onClose,
  heading,
  children,
  autoOpen = false,
  trigger,
  onCloseRef,
  dialogContentClassName = 'sm:max-w-[425px]',
}: Props) {
  const [open, setOpen] = useState(false);
  const isDesktop = !useIsMobile();

  useEffect(() => {
    if (autoOpen) {
      setOpen(true);
    }
  }, [autoOpen]);

  function onCloseHandler() {
    setOpen(false);
    onClose?.();
  }

  useEffect(() => {
    if (onCloseRef) {
      onCloseRef.current = () => {
        setOpen(false);
      };
    }
  }, [onCloseRef]);

  if (isDesktop) {
    return (
      <Dialog
        open={open}
        onOpenChange={(val) => {
          if (!val) {
            onClose?.();
          }
          setOpen(val);
        }}
      >
        {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
        <DialogContent className={dialogContentClassName}>
          <DialogHeader>
            <DialogTitle className='text-start pb-0'>
              <Heading>{heading}</Heading>
            </DialogTitle>
          </DialogHeader>
          {children({
            onClose: onCloseHandler,
          })}
        </DialogContent>
      </Dialog>
    );
  }
  return (
    <Drawer
      open={open}
      onOpenChange={(val) => {
        if (!val) {
          onClose?.();
        }
        setOpen(val);
      }}
    >
      {trigger && <DrawerTrigger asChild>{trigger}</DrawerTrigger>}
      <DrawerContent className='p-0'>
        <DrawerHeader className='text-left pb-0'>
          <DrawerTitle className='text-start pb-0'>
            <Heading>{heading}</Heading>
          </DrawerTitle>
        </DrawerHeader>
        {children({
          onClose: onCloseHandler,
        })}
      </DrawerContent>
    </Drawer>
  );
}
