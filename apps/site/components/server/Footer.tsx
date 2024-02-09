import { Flex, Typography } from '@/design-system'

export function Footer() {
  return (
    <Flex className="absolute bottom-0 gap-2 w-full justify-start py-3">
      <Typography className="hover:underline hover:cursor-pointer">
        <span className="text-[14px]"></span>view on {' '}
        <a
          href="https://www.river.ph/channel/bafyreigav3dz3sstenuy3zhik6snbeasj7ntwecf7ffguuses5kevfipla"
          target="_blank"
          rel="noopener noreferrer"
        >
          river.ph
        </a>
      </Typography>
    </Flex>
  )
}
