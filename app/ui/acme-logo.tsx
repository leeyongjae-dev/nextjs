import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image'

export default function AcmeLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      {/* <GlobeAltIcon className="h-12 w-12 rotate-[15deg]" /> */}
      <Image src="/interlplug_logo.png" className="h-full w-full" alt="logo" width={100} height={100}/>
      {/* <p className="text-[44px]"> INTERPLUG</p> */}
    </div>
  );
}
