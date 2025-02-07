import {
  NJListItem,
  NJMultiSelect,
} from "@engie-group/fluid-design-system-react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";

import type { ICustomersData } from "@/api/mocks/crud-customers-mock";
import { executiveOptions } from "@/api/mocks/mocks";
import { columns } from "@/components/tables/users/columns";
import { DataTable } from "@/components/tables/users/data-table";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { FloatingSelect } from "@/components/ui/floating-select";
import { api } from "@/utils/axios";

interface ExecutiveOption {
  value: string;
  name: string;
}

type MappedCustomerData = Omit<ICustomersData, "id" | "status"> & {
  id: string;
  status: string;
};

export const Customers = () => {
  const [filteredData, setFilteredData] = useState<ICustomersData[]>([]);
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);
  const [selectedExecutive, setSelectedExecutive] =
    useState<ExecutiveOption | null>(null);
  const [filtersApplied, setFiltersApplied] = useState(false);

  const fetchCustomers = async () => {
    const response = await api.get<ICustomersData[]>("/api/customers");
    return response.data;
  };

  const { data: customers = [], isPending } = useQuery({
    queryKey: ["customers"],
    queryFn: fetchCustomers,
  });

  const handleFilter = () => {
    let updatedData = customers;

    if (selectedCustomers.length === 0 && selectedExecutive === null) return;

    if (selectedCustomers.length > 0) {
      updatedData = updatedData.filter((item) =>
        selectedCustomers.includes(item.id.toString())
      );
    }

    if (selectedExecutive) {
      updatedData = updatedData.filter(
        (item) =>
          item.executive?.toLowerCase() ===
          selectedExecutive.value.toLowerCase()
      );
    }

    if (selectedExecutive && updatedData.length === 0) {
      updatedData = [];
    }

    setFilteredData(updatedData);
    setFiltersApplied(true);
  };

  const clearFilters = () => {
    setSelectedCustomers([]);
    setSelectedExecutive(null);
    setFilteredData(customers);
    setFiltersApplied(false);
  };

  return (
    <Container>
      <div>
        <div className="flex h-6 items-center gap-x-2">
          <i
            className="material-icons text-secondary"
            style={{ fontSize: "20px" }}
          >
            supervised_user_circle
          </i>
          <h1 className="text-secondary text-base font-bold">Clientes</h1>
        </div>
        <div className="flex h-6 w-full justify-between">
          <div className="flex h-full items-center justify-center gap-x-1">
            <p className="text-label text-sm">Clientes </p>
            <i
              className="material-icons text-label max-w-6"
              style={{ fontSize: "20px" }}
            >
              star_outlined
            </i>
          </div>
          <Link to="/cadastrar-cliente">
            <div className="text-secondary group relative flex cursor-pointer items-center justify-center gap-x-2">
              <i className="material-icons" style={{ fontSize: "18px" }}>
                add_circle_outline
              </i>
              <span className="group-hover:text-secondary relative text-base">
                Cadastrar
                <span className="bg-secondary absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full"></span>
              </span>
            </div>
          </Link>
        </div>

        {/* Filtros */}
        <div className="mt-6 mb-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 sm:flex-nowrap">
          <NJMultiSelect
            onChange={(values) => setSelectedCustomers(values as string[])}
            value={selectedCustomers}
            className="ml-[1px]"
            buttonDefaultValueLabel="Select a value"
            id="select-basic"
            label="Customer"
            listNavigationLabel="Use up and down arrows and Enter to select a value"
          >
            {customers?.map((item) => (
              <NJListItem key={item.id} value={item.id.toString()}>
                {item.customer}
              </NJListItem>
            ))}
          </NJMultiSelect>

          <FloatingSelect
            options={executiveOptions}
            label="Executiva(o)"
            onChange={(value: ExecutiveOption | null) =>
              setSelectedExecutive(value)
            }
            value={selectedExecutive}
          />
          <Button variant="secondary" onClick={handleFilter}>
            Buscar
          </Button>
          {filtersApplied && (
            <i
              className="material-icons text-secondary cursor-pointer bg-[#0353E740] p-2"
              onClick={clearFilters}
              style={{ fontSize: "24px" }}
            >
              filter_list
            </i>
          )}
        </div>

        <DataTable
          loading={isPending}
          columns={columns as MappedCustomerData[]}
          data={
            (filtersApplied ? filteredData : customers).map((customer) => ({
              ...customer,
              id: customer.id.toString(),
              status: customer.status || "Ativo",
            })) as MappedCustomerData[]
          }
        />
      </div>
    </Container>
  );
};
