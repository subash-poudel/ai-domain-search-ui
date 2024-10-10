import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { DomainItem } from "../models/models";

const DomainTable = ({ domains }: { domains: DomainItem[] }) => {
  // Define table columns
  const columns = React.useMemo(
    () => [
      {
        header: "Domain",
        accessorKey: "domain", // same as 'accessor' in older versions
      },
      {
        header: "Available",
        accessorKey: "available",
      },
      {
        header: "Price",
        accessorKey: "price",
      },
    ],
    []
  );

  // Define some sample data
  const data = React.useMemo(() => domains, [domains]);

  // Initialize the table with the columns and data
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(), // Core row model, replaces older hooks like usePagination, useRowSelect, etc.
  });

  return (
    <table style={{ border: "solid 1px black", width: "100%" }}>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                style={{
                  padding: "10px",
                  borderBottom: "solid 1px gray",
                  backgroundColor: "aliceblue",
                  fontWeight: "bold",
                }}
              >
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td
                key={cell.id}
                style={{
                  padding: "10px",
                  border: "solid 1px gray",
                  background: "papayawhip",
                }}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DomainTable;
