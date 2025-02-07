import type React from "react";
import { create } from "zustand";

interface IUseConfirmationlStore {
  isOpen: boolean;
  onOpen: (params: {
    title: string;
    description: string;
    confirmationButton: React.ReactNode;
  }) => void;
  onClose: () => void;
  title: string;
  description: string;
  confirmationButton: React.ReactNode | null;
}

export const useConfirmationModal = create<IUseConfirmationlStore>((set) => ({
  isOpen: false,
  title: "",
  description: "",
  confirmationButton: null,

  onOpen: (params) =>
    set({
      isOpen: true,
      title: params.title,
      description: params.description,
      confirmationButton: params.confirmationButton,
    }),

  onClose: () =>
    set({
      isOpen: false,
      title: "",
      description: "",
      confirmationButton: null,
    }),
}));
