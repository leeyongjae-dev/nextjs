"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

import { fetchBoard } from "@/app/lib/data";

import { FormattedBoardTable } from "@/app/lib/definitions";

export default function Search({
  placeholder,
  totalPages,
  boardList,
}: {
  placeholder: string;
  totalPages: number;
  boardList: FormattedBoardTable[];
}) {
  const [selectValue, setSelectValue] = useState(10);
  const [searchText, setSearchText] = useState("");
  const [searchView, setSearchView] = useState(false);
  const [searchViewText, setSearchViewText] = useState("");

  const handleSearch = (text: string) => {
    const result = fetchBoard(text);
    // setResult(result);

    setSearchViewText(text);
    if (text !== "") {
      setSearchView(true);
    } else {
      setSearchView(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit(e as unknown as React.FormEvent);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchText);
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
              setSearchText(e.target.value);
            }}
            onKeyDown={handleKeyDown}
            defaultValue={""}
          />
          <a onClick={() => handleSearch(searchText)}>
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </a>
        </div>
        <select
          value={selectValue}
          onChange={(e) => {
            setSelectValue(Number(e.target.value));
          }}
        >
          <option value={1}>1</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>
      {searchView && (
        <div className="mt-6 flow-root" style={{ textAlign: "center" }}>
          <span style={{ color: "red" }}>{searchViewText}</span>에 대해 총{" "}
          <span style={{ color: "red" }}>{totalPages}</span>
          건이 검색되었습니다.
        </div>
      )}
    </>
  );
}
