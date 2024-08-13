import { FormattedBoardTable } from "@/app/lib/definitions";
import Table from "@/app/ui/board/table";

export default async function Page({
  searchParams,
  boardList,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    per?: string;
  };
  boardList: FormattedBoardTable[];
}) {
  return (
    <div className="w-full">
      <Table boardList={boardList} totalPages={0} />
    </div>
  );
}
