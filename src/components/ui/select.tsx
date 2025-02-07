import { forwardRef } from "react";
import Select, { GroupBase, Props, SelectInstance } from "react-select";

import { cn } from "@/lib/utils";

import { DropdownIndicator } from "./dropdown-indicator";
import { getCustomStyles } from "./select-styles";

export interface OptionType {
  value: string;
  name: string;
}

export type SelectProps = Props<OptionType, false, GroupBase<OptionType>> & {
  hasError?: boolean;
};

export const BaseSelect = forwardRef<SelectInstance<OptionType>, SelectProps>(
  ({ className, hasError, value, ...props }, ref) => (
    <div className="flex flex-col gap-1">
      <Select<OptionType>
        ref={ref}
        styles={getCustomStyles()}
        value={value}
        className={cn(
          "text-input w-full",
          className,
          hasError && "react-select-error"
        )}
        components={{
          DropdownIndicator,
          IndicatorSeparator: () => null,
        }}
        {...props}
      />
    </div>
  )
);

BaseSelect.displayName = "BaseSelect";
