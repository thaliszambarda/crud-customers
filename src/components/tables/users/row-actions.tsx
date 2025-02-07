import { useMutation, useQueryClient } from "@tanstack/react-query";
import type React from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useConfirmationModal } from "@/hooks/use-cancel-modal";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { api } from "@/utils/axios";

export const RowActions = ({
  customerId,
  isInactivated,
}: {
  customerId: number;
  isInactivated: boolean;
}) => {
  const openModal = useConfirmationModal((state) => state.onOpen);
  const onClose = useConfirmationModal((state) => state.onClose);
  const navigate = useNavigate();

  const handleNavigateClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onClose();
    navigate("/editar-cliente/" + customerId);
  };

  const inactivateCustomer = async () => {
    const response = await api.delete(`/api/customer/${customerId}`);
    return response.data;
  };

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { mutate: UseInactivateCustomerMutation } = useMutation({
    mutationFn: inactivateCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      toast({
        title: "Cliente inativado com sucesso!",
        description: "Você poderá ativá-lo novamente quando quiser.",
      });
      onClose();
    },
    onError: () => {
      toast({
        title: "Erro ao inativar o cliente",
        description: "Ocorreu um erro ao tentar inativar o cliente.",
      });
    },
  });

  const handleInactivateCustomers = (e: React.MouseEvent) => {
    e.stopPropagation();
    const confirmationButton = (
      <Button onClick={() => UseInactivateCustomerMutation()} variant="danger">
        Sim, desejo inativar
      </Button>
    );

    openModal({
      confirmationButton,
      title: "Inativar cliente?",
      description: "Você poderá ativá-lo novamente a qualquer momento",
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild onClick={(e) => e.stopPropagation()}>
        <Button variant="ghost" className="hover:bg-gray size-5 p-0">
          <i
            className={cn(
              "material-icons text-label",
              isInactivated && "text-icon"
            )}
            style={{ fontSize: "16px" }}
          >
            more_vert
          </i>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] py-1" align="end">
        <div className="flex flex-col">
          <Button
            variant="ghost"
            className="text-input h-12 justify-start p-6 text-base font-normal"
            onClick={handleNavigateClick}
          >
            Editar
          </Button>
          {!isInactivated && (
            <Button
              variant="ghost"
              className="h-12 justify-start gap-x-4 p-6 font-normal"
              onClick={handleInactivateCustomers}
            >
              <i
                className="material-icons text-red"
                style={{ fontSize: "24px" }}
              >
                disabled_by_default
              </i>
              <span className="text-red text-base">Inativar</span>
            </Button>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};
