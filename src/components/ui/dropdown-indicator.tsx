import { components } from "react-select";

import { cn } from "@/lib/utils"; // ajuste o caminho conforme sua estrutura

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const DropdownIndicator = (props: any) => {
  const { menuIsOpen, isDisabled } = props.selectProps;

  return (
    <components.DropdownIndicator {...props}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn(
          "text-icon transform transition-transform",
          menuIsOpen && "-rotate-180",
          isDisabled && "text-primary"
        )}
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </components.DropdownIndicator>
  );
};
