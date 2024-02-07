import { Typography, Stack, Flex } from '@/design-system'
import { type Adds } from '@/gql'
import { getUsername, ipfsUrlToCid } from '@/lib'
import { unixTimeConverter } from '@/utils'
import Link from 'next/link'
import { Username } from '@/server'

interface ItemSidebarProps {
  itemContext: Adds
  itemMetadata: {
    name: string
    description: string
    image: string
    animationUri: string
    contentType: string
    muxAssetId?: string
    muxPlaybackId?: string
  } | null
}

export async function ItemSidebar({
  itemContext,
  itemMetadata,
}: ItemSidebarProps) {
  return (
    <Stack className="px-5 py-[10px] h-full justify-between border-t border-border md:border-none">
      {/* Info / Index */}
      <div>
        <Flex className="gap-x-4 items-center">
          <Typography>Info</Typography>
          {/* TODO: Enable index */}
          <Typography className="text-secondary-foreground opacity-0">
            Index
          </Typography>
        </Flex>
        <Stack className="pt-[30px] gap-y-5">
          <div>
            <Typography className="truncate">{itemMetadata?.name}</Typography>
            <Username id={itemContext.item.createdById} />
          </div>
          <Typography>{'--'}</Typography>
        </Stack>
        <Stack className="pt-[45px] gap-y-[3px]">
          <Flex className="justify-between">
            <Typography>Added to</Typography>
            <Link
              href={`/channel/${itemContext.channelId}`}
              className="hover:underline underline-offset-2 transition-all decoration-secondary-foreground"
            >
              <Typography className="text-secondary-foreground">
                {itemContext.channel.name}
              </Typography>
            </Link>
          </Flex>
          <Flex className="justify-between">
            <Typography>Added by</Typography>
            <Username id={itemContext.addedById} />
          </Flex>
          <Flex className="justify-between">
            <Typography>Date added</Typography>
            <Typography className="text-secondary-foreground">
              {unixTimeConverter(itemContext.timestamp)}
            </Typography>
          </Flex>
          <Flex className="justify-between">
            <Typography>Type</Typography>
            <Typography className="text-secondary-foreground">
              {itemMetadata?.contentType}
            </Typography>
          </Flex>
          <Flex className="justify-between">
            <Typography>Content</Typography>
            <Typography className="text-secondary-foreground truncate">
              {itemMetadata?.image === ''
                ? truncateMiddle(
                    ipfsUrlToCid({ ipfsUrl: itemMetadata?.animationUri }),
                  )
                : truncateMiddle(
                    ipfsUrlToCid({ ipfsUrl: itemMetadata?.image as string }),
                  )}
            </Typography>
          </Flex>
        </Stack>
      </div>
      {/* TODO: Enable these features */}
      {/* Add / Download */}
      <Flex className="justify-between opacity-0">
        <Typography className="text-secondary-foreground/50">
          Add to channel
        </Typography>
        <Typography className="text-secondary-foreground/50">
          Download
        </Typography>
      </Flex>
    </Stack>
  )
}

export function truncateMiddle(str: string, ellipsis = '...'): string {
  const frontChars = 5
  const backChars = 5
  if (str.length <= frontChars + backChars) {
    return str
  }
  const start = str.substring(0, frontChars)
  const end = str.substring(str.length - backChars)
  return `${start}${ellipsis}${end}`
}
