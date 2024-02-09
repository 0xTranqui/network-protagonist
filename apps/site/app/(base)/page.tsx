import { Grid, Stack } from "@/design-system";
import { getChannelWithId } from "@/gql";
import { ItemCard } from "@/server";
import { Typography } from "@/design-system";
import { getAddsMetadata } from '@/lib'

export default async function Home() {
  
  // const { channel } = await getChannelWithId({
  //   id: "bafyreigav3dz3sstenuy3zhik6snbeasj7ntwecf7ffguuses5kevfipla"
  // })

  // if (!channel || !channel.adds?.items || channel.adds?.items.length === 0) {
  //   return <Typography>No items added yet</Typography>;
  // }

  return <></>
  //   <Grid className="grid-cols-1 gap-5 py-[30px]">
  //     {channel.adds.items.map((add, index: number) =>
  //       add.removed ? null : (
  //         // @ts-ignore
  //         <ItemCard key={index} add={add} />
  //       )
  //     )}
  //   </Grid>
  // );
}
