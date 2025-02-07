import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
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
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { FloatingLabelInput } from "@/components/ui/floating-input";
import { FloatingSelect } from "@/components/ui/floating-select";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useConfirmationModal } from "@/hooks/use-cancel-modal";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/utils/axios";
import { cnpjMask, onlyNumbers, phoneMask } from "@/utils/mask";
import { CustomerFormSchema } from "@/utils/schema";

export const UpdateCustomer = () => {
  const openModal = useConfirmationModal((state) => state.onOpen);
  const onClose = useConfirmationModal((state) => state.onClose);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { id } = useParams();

  const fetchCustomers = async () => {
    const response = await api.get<ICustomersData>(`/api/customer/${id}`);
    return response.data;
  };

  const { data: customer } = useQuery({
    queryKey: ["customer", id],
    queryFn: fetchCustomers,
  });

  const handleNavigateClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onClose();
    navigate("/clientes");
  };

  const confirmationButton = (
    <Button onClick={handleNavigateClick} variant="secondary">
      Sim, desejo sair
    </Button>
  );

  const handleConfirmationClick = () => {
    openModal({
      confirmationButton,
      description: "Deseja realmente sair?",
      title: "Ações não foram concluídas",
    });
  };

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

  const updateCustomer = async (
    id: string,
    data: Omit<ICustomersData, "id">
  ) => {
    const response = await api.put(`/api/customer/${id}`, data);
    return response.data;
  };

  const { mutate, isPending } = useMutation({
    mutationFn: (data: Omit<ICustomersData, "id">) =>
      updateCustomer(id as string, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      toast({
        title: "Cliente atualizado com sucesso!",
        description: "Edite clientes o que quanto quiser.",
      });
    },
    onError: () => {
      toast({
        title: "Erro ao atualizar cliente!",
        description: "Ocorreu um erro ao tentar atualizar o cliente.",
        isError: true,
      });
    },
  });

  const onSubmit = (data: z.infer<typeof CustomerFormSchema>) => {
    const formattedData = {
      ...data,
      status: data.status?.value,
      executive: data.executive?.value,
      multiSite: data.multiSite?.value,
      type: data.type?.value,
      state: data.state?.value,
      city: data.city?.value,
    };

    mutate(formattedData);
  };

  const phoneValue = form.watch("phone");
  const cnpjValue = form.watch("cnpj");
  const numberValue = form.watch("number");

  useEffect(() => {
    form.setValue("phone", phoneMask(phoneValue));
  }, [form, phoneValue]);

  useEffect(() => {
    form.setValue("cnpj", cnpjMask(cnpjValue));
  }, [form, cnpjValue]);

  useEffect(() => {
    form.setValue("number", onlyNumbers(numberValue));
  }, [form, numberValue]);

  return (
    <Container>
      <div>
        <h1 className="text-secondary text-base font-bold">Editar cliente</h1>
        <div className="flex h-6 w-full justify-between">
          <p className="text-label text-xs italic">
            (<span className="text-red">*</span>) Campos obrigatórios
          </p>
        </div>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-col items-center justify-center gap-6"
        >
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
                      required
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
                      required
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
                      required
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
                      required
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
                      required
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
                      required
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
                      required
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
                      required
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
                      required
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
                      required
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
                        required
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
                    <FloatingLabelInput id="number" label="Número" {...field} />
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
                      label="Complemento"
                      {...field}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </fieldset>
          </div>
          <div className="mt-4 flex w-full items-center justify-center gap-8 md:justify-end">
            <Button onClick={handleConfirmationClick} type="button">
              Cancelar
            </Button>

            <Button disabled={isPending} type="submit" variant="secondary">
              {isPending ? <Loader2 className="animate-spin" /> : "Salvar"}
            </Button>
          </div>
        </form>
      </Form>
    </Container>
  );
};
