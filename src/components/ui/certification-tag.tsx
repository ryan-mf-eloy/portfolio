import { IconBrandAmazon } from "@tabler/icons-react";
import Link from "next/link";

export default function CertificationTag() {
  return (
    <Link
      href="/certifications/aws"
      className="cursor-pointer border border-transparent bg-yellow-100 bg-opacity-5 px-2 py-2 rounded-md flex items-center justify-center gap-2 hover:border hover:border-yellow-500/50 transition-[2000ms]"
    >
      <small className="flex gap-1 bg-yellow-500 px-2 py-1 rounded-sm text-black uppercase font-medium before:content-['certified']">
        <IconBrandAmazon size={20} />
      </small>

      <span className="text-lg font-light">
        AWS Certified Developer - Associate
      </span>
    </Link>
  );
}
