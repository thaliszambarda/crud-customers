import { useConfirmationModal } from "@/hooks/use-cancel-modal";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

export const ConfirmationModal = () => {
  const { isOpen, onClose, confirmationButton, description, title } =
    useConfirmationModal();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="gap-8">
        <DialogHeader className="items-center gap-4">
          <i
            className="material-icons text-warning"
            style={{ fontSize: "64px" }}
          >
            warning
          </i>
          <div className="flex flex-col gap-2 text-center">
            <DialogTitle className="text-input text-2xl font-bold">
              {title}
            </DialogTitle>
            <DialogDescription className="text-warning text-base font-normal">
              {description}
            </DialogDescription>
          </div>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={onClose}>Não</Button>
          {confirmationButton}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
