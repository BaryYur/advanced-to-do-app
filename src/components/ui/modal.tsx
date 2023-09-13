import React from "react";

import { AlertDialog, AlertDialogContent, AlertDialogTitle } from "./alert-dialog";

interface ModalProps {
  title: string,
  isOpen: boolean,
  listColor?: string,
  onClose: () => void,
  children: React.ReactNode,
}

export const Modal: React.FC<ModalProps> = ({
  title,
  isOpen,
  listColor,
  onClose,
  children,
}) => {
  const onChange = (open: boolean) => {
    if (!open) onClose();
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={onChange}>
      <AlertDialogContent>
        <AlertDialogTitle className="flex gap-2 items-center">
          {listColor && <div style={{ borderColor: listColor }} className="rounded-[4px] border-[2.3px] h-[12px] w-[12px] inline" />}
          {title}
        </AlertDialogTitle>
        <div>
          {children}
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}