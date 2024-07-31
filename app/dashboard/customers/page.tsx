import Pagination from '@/app/ui/customers/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/customers/table';
import { CreateInvoice } from '@/app/ui/invoices/buttons';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton, TableRowSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchCustomersPages, fetchFilteredCustomers } from '@/app/lib/data';

export default async function Page({
    searchParams,
  }: {
    searchParams?: {
      query?: string;
      page?: string;
    };
  }) {
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const totalPages = await fetchCustomersPages(query);
    const customers = await fetchFilteredCustomers(query, currentPage);
    const pageBlock = 3;

  return (
    <div className="w-full">
      <Suspense fallback={<TableRowSkeleton/>}>
        <Table customers={customers}/>
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} pageBlock={pageBlock}/>
      </div>
    </div>
  );
}