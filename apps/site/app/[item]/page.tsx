import { AudioPlayer, VideoPlayer } from "@/client";
import { Typography, Flex, Stack } from "@/design-system";
import { getItemPage, getChannelWithId } from "@/gql";
import {
  type MediaAssetObject,
  ipfsUrlToCid,
  isAudio,
  isGlb,
  isImage,
  isMarkdown,
  isPdf,
  isVideo,
  w3sUrlFromCid,
} from "@/lib";
import dynamic from "next/dynamic";
import Image from "next/image";
import { match, P } from "ts-pattern";
import * as React from "react";
import { kv } from "@vercel/kv";
import { getAddsMetadata } from "@/lib";
import { RecentItems } from "components/server/RecentItems";
// import ModelRenderer from 'components/client/renderers/ModelRenderer'

const MarkdownRenderer = dynamic(
  () => import("../../components/client/renderers/MarkdownRenderer"),
  { ssr: false }
);

const ModelRenderer = dynamic(
  () => import("../../components/client/renderers/ModelRenderer"),
  { ssr: false }
);

const PdfViewer = dynamic(
  () => import("../../components/client/renderers/PDFViewer"),
  { ssr: false }
);

export default async function ItemPage({ params }: { params: { item: string } }) {
  const { channel } = await getChannelWithId({
    id: "bafyreihuti6faf2z322aaodxs2gq4cvqoysraiz5gxjolmlwud3jemz2re",
  });

  console.log("params.id", params.item)

  // console.log("channel:", channel);
  // console.log("channel.adds.items:", channel?.adds?.items);

  const totalItems = channel?.adds?.items?.length ?? 0;
  // console.log("totla items:", totalItems);
  const reversedIndex = totalItems - Number(params.item);
  console.log("reversedIndex:", reversedIndex);
  const itemToRender = channel?.adds?.items?.[reversedIndex];
  console.log("item to render:", itemToRender);

  // const { itemPage } = await getItemPage({
  //   id: `${"bafyreigav3dz3sstenuy3zhik6snbeasj7ntwecf7ffguuses5kevfipla"}/${
  //     itemToRender?.itemId
  //   }`,
  // });

  const itemMetadata = await kv.get<Pick<MediaAssetObject, "value">["value"]>(
    itemToRender?.item.uri as string
  );

  const contentType = itemMetadata?.contentType as string;

  let contentUrl: string | undefined;

  if (
    itemMetadata?.contentType === "model/gltf-binary" ||
    itemMetadata?.contentType === "application/pdf" ||
    itemMetadata?.contentType === "text/markdown" ||
    isAudio({ mimeType: itemMetadata?.contentType as string })
  ) {
    const cid = ipfsUrlToCid({ ipfsUrl: itemMetadata?.animationUri as string });
    contentUrl = w3sUrlFromCid({ cid });
  } else {
    const cid = ipfsUrlToCid({ ipfsUrl: itemMetadata?.image as string });
    contentUrl = w3sUrlFromCid({ cid });
  }

  const content = match(contentType)
    .with(
      P.when((type) => isImage({ mimeType: type })),
      () => (
        <div className="relative h-[400px] md:h-full">
          <Image
            className="object-contain"
            src={contentUrl as string}
            alt={itemMetadata?.name as string}
            fill
            quality={90}
            priority={true}
          />
        </div>
      )
    )
    .with(
      P.when((type) => isVideo({ mimeType: type })),
      () => (
        <Flex className="h-full">
          <VideoPlayer playbackId={itemMetadata?.muxPlaybackId as string} />
        </Flex>
      )
    )
    .with(
      P.when((type) => isAudio({ mimeType: type })),
      () => <AudioPlayer playbackId={itemMetadata?.muxPlaybackId as string} />
    )
    .with(
      P.when((type) => isPdf({ mimeType: type })),
      () => <PdfViewer file={contentUrl as string} />
    )
    .with(
      P.when((type) => isGlb({ mimeType: type })),
      () => <ModelRenderer src={contentUrl as string} />
    )
    // TODO: Update styling for markdown renderer
    .with(
      P.when((type) => isMarkdown({ mimeType: type })),
      () => <MarkdownRenderer contentUrl={contentUrl as string} />
    )

    .otherwise(() => (
      <Stack className="h-full items-center justify-center">
        <Typography className="text-secondary-foreground">
          Unsupported file type
        </Typography>
      </Stack>
    ));

  return (
    <Stack className="h-full md:h-[calc(100dvh-76px)] place-content-start place-self-center md:place-content-center md:flex-row">
      <div className="w-full h-full md:w-[78%]">{content}</div>
      {/* <RecentItems /> */}
      {/* <div className="md:w-[22%]">
        <ItemSidebar
          // @ts-ignore
          itemContext={itemPage}
          itemMetadata={itemMetadata}
        />
      </div> */}
    </Stack>
  );
}
