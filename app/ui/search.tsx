"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { CreateCustomer } from "@/app/ui/customers/buttons";
import { CreateInvoice } from "@/app/ui/invoices/buttons";

export default function Search({
  placeholder,
  totalPages,
  page,
}: {
  placeholder: string;
  totalPages: number;
  page: string;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const text = searchParams.get("query");
  const per = searchParams.get("per");

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const handlePagePerSet = (per: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("per", per);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <div className="relative flex flex-1 flex-shrink-0">
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <input
            className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
            placeholder={placeholder}
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
            defaultValue={searchParams.get("query")?.toString()}
          />
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        </div>
        {page === "invoice" ? <CreateInvoice /> : <CreateCustomer />}
        {page !== "invoice" && (
          <select
            defaultValue={10}
            onChange={(e) => {
              handlePagePerSet(e.target.value);
            }}
          >
            <option value={1} selected={Number(per) === 1}>
              1
            </option>
            <option value={10} selected={Number(per) === 10}>
              10
            </option>
            <option value={20} selected={Number(per) === 20}>
              20
            </option>
            <option value={50} selected={Number(per) === 50}>
              50
            </option>
          </select>
        )}
      </div>
      {text && (
        <div className="mt-6 flow-root" style={{ textAlign: "center" }}>
          <span style={{ color: "red" }}>{text}</span>에 대해 총{" "}
          <span style={{ color: "red" }}>{totalPages}</span>
          건이 검색되었습니다.
        </div>
      )}
    </>
  );
}
