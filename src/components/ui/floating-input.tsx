import * as React from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const FloatingInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <Input
        placeholder=" "
        className={cn("peer", className)}
        ref={ref}
        {...props}
      />
    );
  }
);
FloatingInput.displayName = "FloatingInput";

const FloatingLabel = React.forwardRef<
  React.ElementRef<typeof Label>,
  React.ComponentPropsWithoutRef<typeof Label>
>(({ className, ...props }, ref) => {
  return (
    <Label
      className={cn(
        "peer-focus:text-secondary text-icon pointer-events-none absolute start-2 top-2 origin-[0] -translate-y-4 transform cursor-text bg-white px-1 transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-focus:top-2 peer-focus:-translate-y-4 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-2/4",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
FloatingLabel.displayName = "FloatingLabel";

type FloatingLabelInputProps = Omit<InputProps, "id"> & {
  label?: string;
  required?: boolean;
  id: string;
  iconName?: string;
  hasError?: boolean;
};

const FloatingLabelInput = React.forwardRef<
  React.ElementRef<typeof FloatingInput>,
  FloatingLabelInputProps
>(({ id, label, required, className, iconName, hasError, ...props }, ref) => {
  return (
    <div className="relative w-full">
      <FloatingInput
        ref={ref}
        id={id}
        className={cn(className, hasError && "border-red")}
        {...props}
      />
      {label && (
        <FloatingLabel htmlFor={id} className={cn(hasError && "text-red")}>
          {label}
          {required && <span className="text-[#DB3735]"> *</span>}
        </FloatingLabel>
      )}
      {iconName && (
        <i className="material-icons text-icon pointer-events-none absolute top-1/2 right-4 -translate-y-1/2">
          {iconName}
        </i>
      )}
    </div>
  );
});
FloatingLabelInput.displayName = "FloatingLabelInput";

export { FloatingInput, FloatingLabel, FloatingLabelInput };
