export const phoneMask = (value: string | undefined) => {
  if (!value) return "";

  return value
    .replace(/[\D]/g, "") // Remove tudo que não for número
    .replace(/^(\d{2})(\d{4,5})(\d{4}).*/, "($1) $2-$3"); // Aplica a máscara (99) 99999-9999
};

export const cnpjMask = (value: string | undefined) => {
  if (!value) return "";

  return value
    .replace(/\D/g, "")
    .replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2}).*/, "$1.$2.$3/$4-$5"); // Aplica a máscara 99.999.999/9999-99
};

export const onlyNumbers = (value: string | undefined) => {
  if (!value) return "";
  return value.replace(/[^\d]/g, "");
};
