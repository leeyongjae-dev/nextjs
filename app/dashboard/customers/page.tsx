import { fetchCustomersPages, fetchFilteredCustomers } from "@/app/lib/data";
import Pagination from "@/app/ui/customers/pagination";
import Table from "@/app/ui/customers/table";
import { CustomersTableSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    per?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const pagePer = [1, 10, 20, 50].includes(Number(searchParams?.per))
    ? Number(searchParams?.per)
    : 10;

  const totalPages = await fetchCustomersPages(query);
  const customers = await fetchFilteredCustomers(query, currentPage, pagePer);
  const pageBlock = 3;

  return (
    <div className="w-full">
      <Suspense key={query + currentPage} fallback={<CustomersTableSkeleton />}>
        <Table customers={customers} totalPages={totalPages} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPageCount={totalPages} pageBlock={pageBlock} />
      </div>
    </div>
  );
}
