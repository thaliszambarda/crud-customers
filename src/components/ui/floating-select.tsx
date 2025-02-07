import { Label } from "@radix-ui/react-label";
import { forwardRef, useState } from "react";
import { SelectInstance } from "react-select";

import { cn } from "@/lib/utils";

import { BaseSelect, type OptionType, type SelectProps } from "./select";

interface FloatingSelectProps extends SelectProps {
  label: string;
}

const escapeRegExp = (string: string) =>
  string.replace(/[.*+?^${}()|[\\]\]/g, "\\$&");

export const FloatingSelect = forwardRef<
  SelectInstance<OptionType>,
  FloatingSelectProps
>(
  (
    { label, options, required, value, isDisabled, hasError, ...props },
    ref
  ) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [hasFocus, setHasFocus] = useState(false);

    const formatOptionLabel = ({ name }: OptionType) => {
      if (!searchTerm) return <>{name}</>;

      const regex = new RegExp(`(${escapeRegExp(searchTerm)})`, "gi");
      return label.split(regex).map((part, index) =>
        regex.test(part) ? (
          <span key={index} className="text-secondary font-semibold">
            {part}
          </span>
        ) : (
          part
        )
      );
    };

    const isFloatingLabel = hasFocus || !!value || !!searchTerm;

    // Condições para flutuar o label
    const labelPositionClass =
      (isFloatingLabel || isDisabled) && "left-2 -translate-y-5 px-1";

    // Define a cor do texto do label com base nas condições:
    // - Se houver erro, o texto é vermelho.
    // - Se estiver desabilitado, o texto é primário.
    // - Se estiver flutuando ou com foco (sem valor), o texto é secundário.
    // - Caso contrário, utiliza a cor padrão do label.
    const labelTextColor = hasError
      ? "text-red"
      : isDisabled
        ? "text-primary"
        : (isFloatingLabel || hasFocus) && !value
          ? "text-secondary"
          : "text-label";

    return (
      <div className="group relative w-full">
        <Label
          className={cn(
            "text-icon pointer-events-none absolute start-4 top-1/4 z-10 bg-white text-sm transition-all duration-300",
            labelPositionClass,
            labelTextColor
          )}
        >
          {label}
          {required && <span className="text-[#DB3735]"> *</span>}
        </Label>
        <BaseSelect
          {...props}
          ref={ref}
          options={options}
          value={value ?? null}
          isDisabled={isDisabled}
          isSearchable
          hasError={hasError}
          formatOptionLabel={formatOptionLabel}
          onInputChange={(value: string) => setSearchTerm(value)}
          onFocus={() => setHasFocus(true)}
          onBlur={() => setHasFocus(false)}
          placeholder=" "
        />
      </div>
    );
  }
);

FloatingSelect.displayName = "FloatingSelect";
