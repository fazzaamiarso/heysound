"use server";
import { getStore } from "@netlify/blobs";

export async function getSoundsMetadata() {
  const store = getStore("sounds");
  const blobList = await store.list();

  const soundsData = await Promise.all(
    blobList.blobs.map(async (blob) => {
      const metadata = await store.getMetadata(blob.key);
      return { key: blob.key, metadata: metadata?.metadata };
    }),
  );

  return soundsData;
}
