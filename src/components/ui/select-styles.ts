import { CSSObjectWithLabel, OptionProps, StylesConfig } from "react-select";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getCustomStyles = (): StylesConfig<any> => ({
  control: (base: CSSObjectWithLabel, state) => ({
    ...base,
    borderColor: state.selectProps.className?.includes("react-select-error")
      ? "#DB3735"
      : state.isFocused
        ? "#007ACD"
        : "#9EADB8",
    borderRadius: 0,
    height: "40px",
    paddingInline: "8px",
    backgroundColor: "white",
    boxShadow: "none", // Remove a sombra de focus
    ":hover": {
      borderColor: state.selectProps.className?.includes("react-select-error")
        ? "#DB3735"
        : state.isFocused
          ? "#007ACD"
          : "#9EADB8",
      backgroundColor: "white",
    },
  }),
  singleValue: (base: CSSObjectWithLabel, state) => ({
    ...base,
    color: state.isDisabled ? "#9EADB8" : base.backgroundColor,
  }),
  menu: (base: CSSObjectWithLabel) => ({
    ...base,
    borderColor: "#9EADB8",
    border: "1px",
    zIndex: 20,
    borderRadius: 0,
  }),
  option: (provided: CSSObjectWithLabel, state: OptionProps<unknown>) => ({
    ...provided,
    borderRadius: 0,
    position: "relative",
    paddingInline: "24px",
    fontSize: "14px",
    fontWeight: "400",
    color: "#171D21",
    backgroundColor:
      state.isSelected || state.isFocused ? "#052B5014" : "transparent",
    ":before": {
      // eslint-disable-next-line quotes
      content: '""',
      position: "absolute",
      top: state.isSelected ? "0%" : "50%", // Posição inicial diferente para selecionado
      left: 0,
      height: state.isSelected ? "100%" : "0%", // Estado inicial diferente
      width: "2px",
      backgroundColor: state.isSelected ? "#007ACD" : "transparent",
      transition: state.isSelected
        ? "none" // Remove transição para estado inicial selecionado
        : "all 0.3s ease",
      transform: state.isSelected ? "none" : "translateY(-50%)",
      animation: state.isSelected
        ? "expandFromCenter 0.3s ease forwards" // Animação apenas no selecionado
        : "none",
    },
    ":hover::before": {
      ...(!state.isSelected && {
        // Aplica apenas se não estiver selecionado
        top: "0%",
        height: "100%",
        backgroundColor: "#007ACD",
        transform: "none",
      }),
    },
    ":focus::before": {
      ...(!state.isSelected && {
        // Mantém consistência com hover
        top: "0%",
        height: "100%",
        backgroundColor: "#007ACD",
        transform: "none",
      }),
    },
    "&:hover": {
      backgroundColor: "#052B5014",
    },
    // Keyframes para animação inicial do selecionado
    "@keyframes expandFromCenter": {
      from: {
        height: "0%",
        top: "50%",
        transform: "translateY(-50%)",
      },
      to: {
        height: "100%",
        top: "0%",
        transform: "none",
      },
    },
    ...(state.isSelected && {
      ":before": {
        // eslint-disable-next-line quotes
        content: '" "',
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        width: "2px",
        backgroundColor: "#007ACD",
      },
    }),
  }),
});
