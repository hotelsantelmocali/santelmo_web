import Image from "next/image";
import logoOnDark from "../public/images/logo-on-dark-background.png";
import logoOnLight from "../public/images/logo-on-light-background.png";

interface BrandLogoProps {
  variant?: "dark" | "light";
  className?: string;
}

export default function BrandLogo({
  variant = "dark",
  className,
}: BrandLogoProps) {
  const logo = variant === "dark" ? logoOnDark : logoOnLight;

  return (
    <Image
      src={logo}
      alt="Hotel Santelmo"
      sizes="(max-width: 640px) 144px, 192px"
      className={className}
    />
  );
}
