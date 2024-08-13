import { FormattedBoardTable } from "@/app/lib/definitions";
import { lusitana } from "@/app/ui/fonts";
import Search from "./search";

export default async function BoardTable({
  boardList,
  totalPages,
}: {
  boardList: FormattedBoardTable[];
  totalPages: number;
}) {
  return (
    <div className="w-full">
      <h1 className={`${lusitana.className} mb-8 text-xl md:text-2xl`}>
        게시판
      </h1>

      <Search
        placeholder="검색어를 입력하세요."
        totalPages={totalPages}
        boardList={boardList}
      />

      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
              <div className="md:hidden">
                {/* {boardList?.map((customer) => (
                  <div
                    key={customer.}
                    className="mb-2 w-full rounded-md bg-white p-4"
                  >
                    <div className="flex items-center justify-between border-b pb-4">
                      <div>
                        <div className="mb-2 flex items-center">
                          <div className="flex items-center gap-3">
                            <Image
                              src={customer.image_url}
                              className="rounded-full"
                              alt={`${customer.name}'s profile picture`}
                              width={28}
                              height={28}
                            />
                            <Link
                              href={`/dashboard/customers/${customer.id}/edit`}
                            >
                              <strong>{customer.name}</strong>
                            </Link>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500">
                          {customer.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex w-full items-center justify-between border-b py-5">
                      <div className="flex w-1/2 flex-col">
                        <p className="text-xs">Pending</p>
                        <p className="font-medium">{customer.total_pending}</p>
                      </div>
                      <div className="flex w-1/2 flex-col">
                        <p className="text-xs">Paid</p>
                        <p className="font-medium">{customer.total_paid}</p>
                      </div>
                    </div>
                    <div className="pt-4 text-sm">
                      <p>{customer.total_invoices} invoices</p>
                    </div>
                    <div className="pt-4 text-sm">
                      <p>Reg Date : {customer.reg_date}</p>
                    </div>
                  </div>
                ))} */}
              </div>
              <table className="hidden min-w-full rounded-md text-gray-900 md:table">
                <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
                  <tr>
                    <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                      번호
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      제목
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      작성자명
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      조회수
                    </th>
                    <th scope="col" className="px-4 py-5 font-medium">
                      등록일
                    </th>
                    <th scope="col" className="px-4 py-5 font-medium">
                      수정일
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 text-gray-900">
                  {boardList?.length > 0 ? (
                    boardList.map((board, index) => (
                      <tr key={board.board_no} className="group">
                        <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                          {index}
                        </td>
                        <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                          {board.title}
                        </td>
                        <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                          {board.writer_nm}
                        </td>
                        <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                          {board.view_cnt}
                        </td>
                        <td className="whitespace-nowrap bg-white px-4 py-5 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md">
                          {board.reg_dt}
                        </td>
                        <td className="whitespace-nowrap bg-white px-4 py-5 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md">
                          {board.mod_dt}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        className="whitespace-nowrap bg-white px-4 py-5 text-sm"
                        colSpan={6}
                        style={{ textAlign: "center" }}
                      >
                        검색 결과가 없습니다.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
