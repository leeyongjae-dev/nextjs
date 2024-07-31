'use client';

import { ArrowLeftIcon, ArrowRightIcon
  , ArrowLongLeftIcon, ArrowLongRightIcon 
  , ArrowLeftStartOnRectangleIcon, ArrowRightStartOnRectangleIcon
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Link from 'next/link';
import { generateBlockPagination } from '@/app/lib/utils';
import { usePathname, useSearchParams } from 'next/navigation';
import { string } from 'zod';

export default function Pagination({ totalPages, pageBlock }: { totalPages: number, pageBlock: number }) {
  // NOTE: Uncomment this code in Chapter 11

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };


  const allPages = generateBlockPagination(currentPage, totalPages, pageBlock);
  
  const totalBlock = Math.ceil(parseFloat(Number(totalPages / pageBlock).toString()));
  const currentBlock = Math.ceil(parseFloat(Number(currentPage / pageBlock).toString()));
  const currentBlockPrev = currentBlock > 1 ? (currentBlock - 1) * pageBlock: 1;
  const currentBlockNext = currentBlock < totalBlock ? (currentBlock * pageBlock) + 1 : totalPages;
  
  return (
    <>
      {/*  NOTE: Uncomment this code in Chapter 11 */}

      <div className="inline-flex">

        <PaginationStartEnd
          direction="first"
          href={createPageURL(1)}
          isDisabled={currentPage === 1}
        />

        <PaginationArrow
          direction="left"
          href={createPageURL(currentBlockPrev)}
          isDisabled={currentBlock === 1}
          block={true}
        />

        <PaginationArrow
          direction="left"
          href={createPageURL(currentPage - 1)}
          isDisabled={currentPage <= 1}
          block={false}
        />

        <div className="flex -space-x-px">
          {allPages.map((page, index) => {

            let position: 'first' | 'last' | 'single' | 'middle' | undefined;

            if (index === 0) position = 'first';
            if (index === allPages.length - 1) position = 'last';
            if (allPages.length === 1) position = 'single';

            return (
              <PaginationNumber
                key={page}
                href={createPageURL(page)}
                page={page}
                position={position}
                isActive={currentPage === page}
              />
            );
          })}
        </div>

        <PaginationArrow
          direction="right"
          href={createPageURL(currentPage + 1)}
          isDisabled={currentPage >= totalPages}
          block={false}
        />

        <PaginationArrow
          direction="right"
          href={createPageURL(currentBlockNext)}
          isDisabled={currentBlock === totalBlock}
          block={true}
        />

        <PaginationStartEnd
          direction="end"
          href={createPageURL(totalPages)}
          isDisabled={currentPage === totalPages}
        />

      </div>
    </>
  );
}

function PaginationNumber({
  page,
  href,
  isActive,
  position,
}: {
  page: number | string;
  href: string;
  position?: 'first' | 'last' | 'middle' | 'single';
  isActive: boolean;
}) {
  const className = clsx(
    'flex h-10 w-10 items-center justify-center text-sm border',
    {
      'rounded-l-md': position === 'first' || position === 'single',
      'rounded-r-md': position === 'last' || position === 'single',
      'z-10 bg-blue-600 border-blue-600 text-white': isActive,
      'hover:bg-gray-100': !isActive && position !== 'middle',
      'text-gray-300': position === 'middle',
    },
  );

  return isActive || position === 'middle' ? (
    <div className={className}>{page}</div>
  ) : (
    <Link href={href} className={className}>
      {page}
    </Link>
  );
}

function PaginationArrow({
  href,
  direction,
  isDisabled,
  block
}: {
  href: string;
  direction: 'left' | 'right';
  isDisabled?: boolean;
  block?: boolean;
}) {
  const className = clsx(
    'flex h-10 w-10 items-center justify-center rounded-md border',
    {
      'pointer-events-none text-gray-300': isDisabled,
      'hover:bg-gray-100': !isDisabled,
      'mr-2 md:mr-4': direction === 'left',
      'ml-2 md:ml-4': direction === 'right',
    },
  );

  const icon =
    direction === 'left' ? (
      block ? (
        <ArrowLeftStartOnRectangleIcon className="w-4" />
      ) : (
        <ArrowLeftIcon className="w-4" />
      )
    ) : (
      block ? (
        <ArrowRightStartOnRectangleIcon className="w-4" />  
      ) : (
        <ArrowRightIcon className="w-4" />  
      )
    );

  return isDisabled ? (
    <div className={className}>{icon}</div>
  ) : (
    <Link className={className} href={href}>
      {icon}
    </Link>
  );
}

function PaginationStartEnd({
  href,
  direction,
  isDisabled,
}: {
  href: string;
  direction: 'first' | 'end';
  isDisabled?: boolean;
  block?: boolean;
}) {
  const className = clsx(
    'flex h-10 w-10 items-center justify-center rounded-md border text-xs',
    {
      'pointer-events-none text-gray-300': isDisabled,
      'hover:bg-gray-100': !isDisabled,
      'mr-2 md:mr-4': direction === 'first',
      'ml-2 md:ml-4': direction === 'end',
    },
  );

  const icon =
    direction === 'first' ? (
      '처음'
    ) : (
      '마지막'
    );

  return isDisabled ? (
    <div className={className}>{icon}</div>
  ) : (
    <Link className={className} href={href}>
      {icon}
    </Link>
  );
}