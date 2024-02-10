import { Stack, Typography } from '@/design-system'
import { type Adds } from '@/gql'
import { type MediaAssetObject, w3sUrlFromCid } from '@/lib'
import { unixTimeConverter } from '@/utils'
import { kv } from '@vercel/kv'
import Link from 'next/link'
import { truncateText } from '@/utils'

export async function ItemCard({
  add,
}: {
  add: Adds
}) {
  const itemMetadata = await kv.get<Pick<MediaAssetObject, 'value'>['value']>(
    add?.item?.uri as string,
  )

  const totalItems = add.channel.adds?.items?.length ?? 0

  const itemIndex =
    totalItems -
    (add.channel.adds?.items?.findIndex(
      (item) => item.itemId === add.item.id,
    ) as number)

  return (
    <Stack className="gap-y-[10px]">
      <Link
        href={`/${itemIndex}`}
        className="transition-all"
      >
        <Typography className="">
          {truncateText(itemMetadata?.name as string, 20, false) ?? 'untitled'}
        </Typography>        
      </Link>
      {/* <Typography className="text-secondary-foreground">
        {unixTimeConverter(add.item.timestamp)}
      </Typography> */}
    </Stack>
  )
}
