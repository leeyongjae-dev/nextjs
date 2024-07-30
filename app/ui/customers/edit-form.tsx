'use client';

import { CustomerForm } from '@/app/lib/definitions';
import {
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { UpdateCustomer } from './buttons';
import { updateCustomer } from '@/app/lib/actions';

export default function EditCustomerForm({
  customer,
}: {
  customer: CustomerForm;
}) {
  const updateCustomerWithId = updateCustomer.bind(null, customer.id);

  const imgUrl = [
    {
        code : "URL001"
      , url : "/customers/balazs-orban.png"
    } ,
    { 
        code : "URL002"
      , url : "/customers/amy-burns.png"
    } ,
    { 
        code : "URL003"
      , url : "/customers/michael-novotny.png"
    } ,
    { 
        code : "URL004"
      , url : "/customers/lee-robinson.png"
    } ,
    { 
        code : "URL005"
      , url : "/customers/evil-rabbit.png"
    } ,
    { 
        code : "URL006"
      , url : "/customers/delba-de-oliveira.png"
    }
  ]

  return (
    <form action={ updateCustomerWithId }>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Customer Name */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            <span style={{ color: "red", paddingRight: "3px" }}>*</span>
            Insert customer Name
          </label>
          <div className="relative">
            <div className="relative">
              <input
                id="name"
                name="name"
                type="input"
                placeholder="Enter Customer Name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                required
                defaultValue={customer.name}
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
          </div>
        </div>

        {/* Customer Email */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            <span style={{ color: "red", paddingRight: "3px" }}>*</span>
            Insert Customer EMAIL
          </label>
          <div className="relative">
            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter Customer EMAIL"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                required
                defaultValue={customer.email}
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
          </div>
        </div>

        {/* Customer imageUrl */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            <span style={{ color: "red", paddingRight: "3px" }}>*</span>
            Choose IMG URL
          </label>
          <div className="relative">
            <select
              id="imageurl"
              name="imageurl"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={customer.imageurl}
              required
            >
              <option value="" disabled>
                Select IMG URL
              </option>
              {imgUrl.map((img) => (
                <option key={img.code} value={img.url}>
                  {img.url}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/customers"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Edit Customer</Button>
      </div>
    </form>
  );
}
