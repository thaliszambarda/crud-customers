import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import { z } from "zod";

import type { ICustomersData } from "@/api/mocks/crud-customers-mock";
import {
  cityOptions,
  executiveOptions,
  multiSiteOptions,
  stateOptions,
  statusOptions,
  typeOptions,
} from "@/api/mocks/mocks";
import { Container } from "@/components/ui/container";
import { FloatingLabelInput } from "@/components/ui/floating-input";
import { FloatingSelect } from "@/components/ui/floating-select";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { api } from "@/utils/axios";
import { CustomerFormSchema } from "@/utils/schema";

export const ReadCustomer = () => {
  const { id } = useParams();

  const fetchCustomers = async () => {
    const response = await api.get<ICustomersData>(`/api/customer/${id}`);
    return response.data;
  };

  const { data: customer } = useQuery({
    queryKey: ["customer", id],
    queryFn: fetchCustomers,
  });

  const form = useForm<z.infer<typeof CustomerFormSchema>>({
    resolver: zodResolver(CustomerFormSchema),
    defaultValues: {
      ...customer,
      status: statusOptions.find((option) => option.value === customer?.status),
      executive: executiveOptions.find(
        (option) => option.value === customer?.executive
      ),
      multiSite: multiSiteOptions.find(
        (option) => option.value === customer?.multiSite
      ),
      type: typeOptions.find((option) => option.value === customer?.type),
      state: stateOptions.find((option) => option.value === customer?.state),
      city: cityOptions.find((option) => option.value === customer?.city),
    },
  });

  useEffect(() => {
    if (customer) {
      form.reset({
        ...customer,

        status: statusOptions.find(
          (option) => option.value === customer?.status
        ),
        executive: executiveOptions.find(
          (option) => option.value === customer?.executive
        ),
        multiSite: multiSiteOptions.find(
          (option) => option.value === customer?.multiSite
        ),
        type: typeOptions.find((option) => option.value === customer?.type),
        state: stateOptions.find((option) => option.value === customer?.state),
        city: cityOptions.find((option) => option.value === customer?.city),
      });
    }
  }, [customer, form]);

  return (
    <Container>
      <div>
        <h1 className="text-secondary text-base font-bold">Cliente</h1>
        <div className="flex items-center justify-end gap-x-6">
          <Link to="/clientes">
            <div className="text-secondary group relative flex cursor-pointer items-center justify-center gap-x-2">
              <span className="material-icons" style={{ fontSize: "18px" }}>
                arrow_back
              </span>
              <span className="group-hover:text-secondary relative text-base">
                Voltar
                <span className="bg-secondary absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full"></span>
              </span>
            </div>
          </Link>

          <Link to={`/editar-cliente/${id}`}>
            <div className="text-secondary group relative flex cursor-pointer items-center justify-center gap-x-2">
              <span className="material-icons" style={{ fontSize: "18px" }}>
                edit
              </span>
              <span className="group-hover:text-secondary relative text-base">
                Editar
                <span className="bg-secondary absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full"></span>
              </span>
            </div>
          </Link>
        </div>
      </div>
      <Form {...form}>
        <form className="flex w-full flex-col items-center justify-center gap-6">
          <div className="flex w-full items-center gap-2">
            <h2 className="text-input min-w-20 text-sm">Dados gerais</h2>
            <hr className="border-primary w-full border-t" />
          </div>
          <div className="flex w-full flex-col items-center justify-center gap-x-8 gap-y-4 md:gap-y-10">
            <fieldset className="grid w-full gap-x-8 gap-y-4 md:grid-cols-2 md:gap-y-10">
              <FormField
                name="customer"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FloatingLabelInput
                      id="customer"
                      label="Cliente"
                      className="pointer-events-none"
                      hasError={!!form.formState.errors.customer}
                      {...field}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="status"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FloatingSelect
                      className="pointer-events-none"
                      options={statusOptions}
                      label="Status"
                      {...field}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="corporateReason"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FloatingLabelInput
                      id="corporateReason"
                      label="Razão social"
                      className="pointer-events-none"
                      hasError={!!form.formState.errors.corporateReason}
                      {...field}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="cnpj"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FloatingLabelInput
                      id="cnpj"
                      label="CNPJ"
                      className="pointer-events-none"
                      hasError={!!form.formState.errors.cnpj}
                      {...field}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="phone"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FloatingLabelInput
                      id="phone"
                      label="Telefone"
                      className="pointer-events-none"
                      iconName="phone"
                      {...field}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="stateRegistration"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FloatingLabelInput
                      id="stateRegistration"
                      className="pointer-events-none"
                      label="Inscrição estadual"
                      {...field}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </fieldset>

            <fieldset className="grid w-full gap-x-8 gap-y-4 md:grid-cols-3 md:gap-y-10">
              <FormField
                name="executive"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FloatingSelect
                      options={executiveOptions}
                      label="Executiva(o)"
                      className="pointer-events-none"
                      hasError={!!form.formState.errors.executive?.value}
                      {...field}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="multiSite"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FloatingSelect
                      options={multiSiteOptions}
                      label="Multisite"
                      className="pointer-events-none"
                      hasError={!!form.formState.errors.multiSite?.value}
                      {...field}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="type"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FloatingSelect
                      options={typeOptions}
                      label="Tipo"
                      className="pointer-events-none"
                      hasError={!!form.formState.errors.type?.value}
                      {...field}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </fieldset>

            <div className="flex w-full items-center gap-2">
              <h2 className="text-input text-sm">Endereço</h2>
              <hr className="border-primary w-full border-t" />
            </div>

            <fieldset className="grid w-full gap-x-8 gap-y-4 md:grid-cols-2 md:gap-y-10">
              <FormField
                name="cep"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FloatingLabelInput
                      id="cep"
                      label="CEP"
                      className="pointer-events-none"
                      hasError={!!form.formState.errors.cep}
                      {...field}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="state"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FloatingSelect
                      options={stateOptions}
                      label="Estado"
                      className="pointer-events-none"
                      hasError={!!form.formState.errors.state?.value}
                      {...field}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="city"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FloatingSelect
                      options={cityOptions}
                      label="Cidade"
                      className="pointer-events-none"
                      hasError={!!form.formState.errors.city?.value}
                      {...field}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="neighborhood"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FloatingLabelInput
                      id="neighborhood"
                      label="Bairro"
                      className="pointer-events-none"
                      hasError={!!form.formState.errors.neighborhood}
                      {...field}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="md:col-span-2">
                <FormField
                  name="street"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FloatingLabelInput
                        id="street"
                        label="Logradouro"
                        className="pointer-events-none"
                        hasError={!!form.formState.errors.street}
                        {...field}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                name="number"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FloatingLabelInput
                      className="pointer-events-none"
                      id="number"
                      label="Número"
                      {...field}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="complement"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FloatingLabelInput
                      id="complement"
                      className="pointer-events-none"
                      label="Complemento"
                      {...field}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </fieldset>
          </div>
        </form>
      </Form>
    </Container>
  );
};
