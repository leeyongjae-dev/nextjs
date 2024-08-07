import AcmeLogo from "@/app/ui/acme-logo";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function Page() {
  const urlLink = [
    {
      url: "/dashboard",
      name: "Dashboard",
      target: "N",
    },
    {
      url: "https://mail.worksmobile.com",
      name: "Mail",
      target: "Y",
    },
    {
      url: "http://gw.interplug.co.kr/main/platformFrame.do",
      name: "Groupware",
      target: "Y",
    },
    {
      url: "http://1.248.227.176:43333/redmine/",
      name: "Redmine",
      target: "Y",
    },
    /* 필요시 추가 */
  ];

  return (
    <main className="flex min-h-screen flex-col p-6">
      {/* <div className={styles.shape}/> */}

      <div className="flex h-20 shrink-0 rounded-lg bg-gray-200 p-4 md:h-52">
        <AcmeLogo />
      </div>

      <div className="mt-4 flex grow flex-col gap-4">
        <div className="flex flex-col justify-center rounded-lg bg-gray-50 px-6 py-10">
          {/* DashBoard In */}
          {urlLink.map((data) => (
            <Link
              key={data.name}
              href={data.url}
              className="flex items-center gap-5 self-start rounded-lg px-6 py-3 text-sm font-medium transition-colors hover:bg-gray-200 md:text-base"
              style={{ width: "100%" }}
              target={data.target === "Y" ? "_blank" : ""}
            >
              <span>{data.name}</span> <ArrowRightIcon className="w-5 md:w-6" />
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
