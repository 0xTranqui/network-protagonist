import { Typography, Grid } from '@/design-system'
import { getChannelWithId } from '@/gql'
import { getChannelMetadata } from '@/lib'
import Link from 'next/link'
import { ItemCard } from './ItemCard'

export async function RecentItems() {
  const { channel } = await getChannelWithId({
    id: "bafyreihuti6faf2z322aaodxs2gq4cvqoysraiz5gxjolmlwud3jemz2re"
  })

  if (!channel || !channel.adds?.items || channel.adds?.items.length === 0) {
    return <Typography>No items added yet</Typography>;
  }

  return (
    <Grid className="w-[200px] py-[50px] md:py-[100px] grid-cols-1 gap-[10px]">
      {channel.adds.items.map((add, index: number) =>
        add.removed ? null : (
          <Link
            href={`/${index + 1}`}
            className="transition-all"
          >
          {/* @ts-ignore */}
          <ItemCard key={index} add={add} />
          </Link>
        )
      )}
    </Grid>
  );
}