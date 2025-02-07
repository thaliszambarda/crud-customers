import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { BaseSelect } from "./select";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  const { pageIndex, pageSize } = table.getState().pagination;
  const totalRows = table.getFilteredRowModel().rows.length;
  const pageCount = table.getPageCount();

  const getVisiblePages = () => {
    const currentPage = pageIndex + 1;
    let pages: (number | string)[] = [];

    if (pageCount <= 5) {
      pages = Array.from({ length: pageCount }, (_, i) => i + 1);
    } else {
      if (currentPage <= 3) {
        pages = [1, 2, 3, 4, 5, "...", pageCount];
      } else if (currentPage >= pageCount - 2) {
        pages = [
          1,
          "...",
          pageCount - 4,
          pageCount - 3,
          pageCount - 2,
          pageCount - 1,
          pageCount,
        ];
      } else {
        pages = [
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          pageCount,
        ];
      }
    }
    return pages;
  };

  return (
    <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:justify-between">
      {/* Itens por página */}
      <div className="flex items-center space-x-4">
        <BaseSelect
          value={{ value: String(pageSize), label: String(pageSize) }}
          onChange={(selectedOption) => {
            table.setPageSize(Number(selectedOption?.value));
          }}
          options={[
            { value: "10", label: "10" },
            { value: "20", label: "20" },
            { value: "50", label: "50" },
          ]}
        />
        <p className="text-label text-sm font-normal">Itens por página</p>
      </div>

      {/* Paginação */}
      <div className="flex items-center space-x-2 lg:space-x-4">
        {/* Contagem de itens */}
        <div className="text-label text-sm font-normal">
          {pageIndex * pageSize + 1} -{" "}
          {Math.min((pageIndex + 1) * pageSize, totalRows)} de{" "}
          <b className="text-input">{totalRows}</b> itens
        </div>

        {/* Controles de paginação */}
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            className=""
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <i
              className="material-icons text-input"
              style={{ fontSize: "24px" }}
            >
              navigate_before
            </i>
          </Button>
          {getVisiblePages().map((page, index) =>
            page === "..." ? (
              <span key={index} className="px-2 py-1">
                ...
              </span>
            ) : (
              <Button
                key={index}
                variant={pageIndex + 1 === page ? "default" : "ghost"}
                size="sm"
                className={cn("text-input size-8 rounded-none", {
                  "border-secondary hover:text-input border-b-2 bg-[#0F55E11A] hover:bg-[#0F55E11A]":
                    pageIndex + 1 === page,
                })}
                onClick={() => table.setPageIndex(Number(page) - 1)}
              >
                {page}
              </Button>
            )
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <i
              className="material-icons text-input"
              style={{ fontSize: "24px" }}
            >
              navigate_next
            </i>
          </Button>
        </div>
      </div>
    </div>
  );
}
