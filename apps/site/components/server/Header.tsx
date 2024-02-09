import { Flex, Typography } from "@/design-system";
import Link from "next/link";

export function Header() {
  return (
    <Flex className="absolute top-[20px] w-fit">
      <Link href={"/"}>
        <Typography>networkprotagoni.st</Typography>
      </Link>
    </Flex>
  );
}
