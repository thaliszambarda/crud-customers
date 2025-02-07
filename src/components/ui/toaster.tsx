import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";

import { CustomProgress } from "../custom-progress";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({
        id,
        title,
        description,
        action,
        isError,
        ...props
      }) {
        return (
          <Toast key={id} {...props}>
            <div className="flex gap-x-4">
              <i
                className="material-icons text-white"
                style={{ fontSize: "24px" }}
              >
                {isError ? "error" : "check_circle"}
              </i>
              <div className="grid gap-2">
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && (
                  <ToastDescription>{description}</ToastDescription>
                )}
              </div>
            </div>

            {action}
            <ToastClose />
            <CustomProgress />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
