import Link from "next/link";
import Image from "next/image";
import { icon_Links as icon } from "@/app/lib/data";

export const Logo: React.FC = (): React.ReactElement => (
  <div className="flex flex-col items-center text-slate-200 gap-6 mt-5">
    {icon.map(({ link, alt, src }) => (
      <Social_IconLink key={link} link={link} alt={alt} src={src} />
    ))}
    <div className="h-[100px] bg-white w-[1px] hidden sm:block"></div>
  </div>
);

const Social_IconLink = ({
  link,
  alt,
  src,
}: {
  link: string;
  alt: string;
  src: string;
}) => (
  <Link target="_blank" href={link}>
    <Image
      src={src}
      className="cursor-pointer"
      width={37}
      height={37}
      alt={alt}
    />
  </Link>
);

export default Social_IconLink;