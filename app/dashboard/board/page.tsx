import Table from "@/app/ui/board/table";

export default async function Page() {
  return (
    <div className="w-full">
      <Table boardList={[]} totalPages={0} />
    </div>
  );
}
// {
//   searchParams,
//   boardList,
// }: {
//   searchParams?: {
//     query?: string;
//     page?: string;
//     per?: string;
//   };
//   boardList: FormattedBoardTable[];
// }) {
//   return (
//     <div className="w-full">
//       <Table boardList={boardList} totalPages={0} />
//     </div>
//   );
// }
