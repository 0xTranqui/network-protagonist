import { Flex, Typography } from "@/design-system";
import Link from "next/link";

export function Footer() {
  return (
    <Flex className="absolute bottom-[20px] gap-2 w-full justify-start">
      <Link href="https://www.river.ph/channel/bafyreihuti6faf2z322aaodxs2gq4cvqoysraiz5gxjolmlwud3jemz2re"></Link>
      <Typography className="hover:cursor-pointer text-[14px]">
        view on river.ph
      </Typography>
    </Flex>
  );
}
