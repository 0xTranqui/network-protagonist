import { Flex, Typography } from "@/design-system";
import Link from "next/link";

export function Header() {
  return (
    <Flex className="w-fit">
      <Link href={"/"}>
        <Typography>networkprotagoni.st</Typography>
      </Link>
    </Flex>
  );
}
