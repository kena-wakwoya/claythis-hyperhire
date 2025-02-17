"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface BreadcrumbProps {
  pageLabel: string;
  pageName?: string;
  middle?: {label:string, route?:string};
  base: {label:string, route:string};
  icon?: any
}
const Breadcrumb = ({ pageName, middle, pageLabel, base, icon }: BreadcrumbProps) => {
  const router = useRouter();
  return (
    <div className="flex flex-col-reverse md:gap-10 gap-5">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary">
          <Image src={icon} width="20" height="20" alt="Breadcrumb picture" />
        </div>
      <h2 className="text-3xl font-bold text-black">
        {pageLabel} 
      </h2>
      </div>

      <nav>
        <ol className="flex items-center text-xs gap-2">
          <li>
            <Link
              className="font-medium capitalize flex items-center gap-2"
              href={`/${base.route}`}
            >
              <Image
                src="/icons/suit-icon.svg"
                alt="Left Poinitng Button Arrow"
                width={20}
                height={16}
              />
              {" / "} {base.label}
            </Link>
          </li>
          {middle && (
            <div className="flex items-center">
              <Image
                src="/icons/right.svg"
                alt="Left Poinitng Button Arrow"
                width={24}
                height={24}
              />
              <li>
                <div
                  onClick={() => router.back()}
                  className="font-medium cursor-pointer flex items-center gap-2"
                >
                  <Image
                    src="/icons/suit-icon.svg"
                    alt="Left Poinitng Button Arrow"
                    width={20}
                    height={16}
                  />
                  {middle.label}
                </div>
              </li>
            </div>
          )}
          {pageName && (
            <div className="flex   items-center">
              <Image
                src="/icons/right.svg"
                alt="Left Poinitng Button Arrow"
                width={24}
                height={24}
              />
              <li className="font-medium ">{pageName}</li>
            </div>
          )}
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
