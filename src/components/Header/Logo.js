import Image from "next/image";
import Link from "next/link";
import siteMetadata from "@/src/utils/siteMetaData";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center text-dark dark:text-light">
      <div className="relative w-12 md:w-16 h-12 md:h-16 rounded-full overflow-hidden border border-solid border-dark dark:border-gray mr-2 md:mr-4">
        <Image
          src={siteMetadata?.siteLogo}
          alt="CodeBucks logo"
          fill
          sizes="(max-width: 768px) 48px, 64px"
          className="rounded-full object-cover"
          priority
        />
      </div>
      <span className="font-bold dark:font-semibold text-lg md:text-xl">
        {siteMetadata?.name}
      </span>
    </Link>
  );
};

export default Logo;
