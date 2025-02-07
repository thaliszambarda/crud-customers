import { z } from "zod";

/* eslint-disable camelcase */
export const CustomerFormSchema = z.object({
  customer: z
    .string({ required_error: "Mínimo 3 caracteres" })
    .min(3, "Mínimo 3 caracteres"),
  status: z
    .object({
      value: z.string(),
      label: z.string(),
    })
    .optional(),
  corporateReason: z
    .string({ required_error: "Mínimo 3 caracteres" })
    .min(3, "Mínimo 3 caracteres"),
  cnpj: z
    .string({ required_error: "Insira um CNPJ válido" })
    .min(14, "Insira um CNPJ válido"),
  phone: z.string().optional(),
  stateRegistration: z.string().optional(),
  executive: z.object(
    {
      value: z.string(),
      label: z.string(),
    },
    { required_error: "Selecione um executivo" }
  ),
  multiSite: z.object(
    {
      value: z.string(),
      label: z.string(),
    },
    { required_error: "Selecione um tipo" }
  ),
  type: z.object(
    {
      value: z.string(),
      label: z.string(),
    },
    { required_error: "Selecione um tipo" }
  ),
  cep: z
    .string({ required_error: "Insira um CEP válido" })
    .min(8, "Insira um CEP válido"),
  state: z.object(
    {
      value: z.string(),
      label: z.string(),
    },
    { required_error: "Selecione um estado" }
  ),
  city: z.object(
    {
      value: z.string(),
      label: z.string(),
    },
    { required_error: "Selecione uma cidade" }
  ),
  neighborhood: z.string({ required_error: "Insira um bairro" }),
  street: z
    .string({ required_error: "Mínimo 3 caracteres" })
    .min(3, "Mínimo 3 caracteres"),
  number: z.string().optional(),
  complement: z.string().optional(),
});
