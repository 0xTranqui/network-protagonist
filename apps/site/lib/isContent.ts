export function isVideo({ mimeType }: { mimeType: string }) {
  return ["video/mp4", "video/webm", "video/ogg", "video/avi", "video/quicktime"].includes(
    mimeType
  );
}

export function isImage({ mimeType }: { mimeType: string }) {
  return ['image/jpeg', 'image/png'].includes(mimeType)
}