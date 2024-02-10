import { Flex, Typography } from "@/design-system";

export function Footer() {
  return (
    <Flex className="absolute bottom-[20px] gap-2 w-full justify-start">
      <a href="https://www.river.ph/channel/bafyreihuti6faf2z322aaodxs2gq4cvqoysraiz5gxjolmlwud3jemz2re">
        <Typography className="hover:cursor-pointer text-[12px]">
          missmayhem was here
        </Typography>
      </a>
    </Flex>
  );
}
