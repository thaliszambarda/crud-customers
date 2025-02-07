"use client";

//import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";

import type { ICustomersData } from "@/api/mocks/crud-customers-mock";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { RowActions } from "./row-actions";

export const columns: ColumnDef<ICustomersData>[] = [
  {
    id: "logo",
    header: () => (
      <i
        className="material-icons text-label mt-1"
        style={{ fontSize: "20px" }}
      >
        business
      </i>
    ),
    cell: () => {
      return (
        <i
          className="material-icons text-secondary mt-1"
          style={{ fontSize: "20px" }}
        >
          business
        </i>
      );
    },
  },
  {
    accessorKey: "customer",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          size="sm"
          className="text-label gap-1"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Cliente
          <i className="material-icons text-label" style={{ fontSize: "20px" }}>
            arrow_drop_down
          </i>
        </Button>
      );
    },
  },
  {
    accessorKey: "cnpj",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          size="sm"
          className="text-label gap-1 p-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          CNPJ
          <i className="material-icons text-label" style={{ fontSize: "20px" }}>
            arrow_drop_down
          </i>
        </Button>
      );
    },
  },
  {
    accessorKey: "type",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          size="sm"
          className="text-label gap-1 p-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tipo
          <i className="material-icons text-label" style={{ fontSize: "20px" }}>
            arrow_drop_down
          </i>
        </Button>
      );
    },
  },
  {
    accessorKey: "multiSite",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          size="sm"
          className="text-label gap-1 p-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Multisite
          <i className="material-icons text-label" style={{ fontSize: "20px" }}>
            arrow_drop_down
          </i>
        </Button>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          size="sm"
          className="text-label gap-1 p-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <i className="material-icons text-label" style={{ fontSize: "20px" }}>
            arrow_drop_down
          </i>
        </Button>
      );
    },
    cell: ({ row }) => {
      const value = row.getValue<string>("status");

      return (
        <Badge
          variant="outline"
          className={cn(
            "bg-tertiary rounded-full border-0 px-2 py-1",
            value === "Inativo" && "bg-gray"
          )}
        >
          <span
            className={cn("text-brand", value === "Inativo" && "text-contrast")}
          >
            {value}
          </span>
        </Badge>
      );
    },
  },
  {
    accessorKey: "executive",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          size="sm"
          className="text-label gap-1 p-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span>Executiva(o)</span>
          <i className="material-icons text-label" style={{ fontSize: "20px" }}>
            arrow_drop_down
          </i>
        </Button>
      );
    },
  },
  {
    id: "action",
    header: () => (
      <i className="material-icons text-label" style={{ fontSize: "20px" }}>
        menu
      </i>
    ),
    cell: ({ row }) => {
      const customer = row.original;

      return (
        <RowActions
          isInactivated={customer.status === "Inativo"}
          customerId={customer.id}
        />
      );
    },
  },
];
