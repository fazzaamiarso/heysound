import { getStore } from "@netlify/blobs";
import Link from "next/link";
import ListItem from "./_components/audio-item";

async function getSoundsMetadata() {
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

export default async function Home() {
  const soundsData = await getSoundsMetadata();

  return (
    <>
      <header className="mx-auto w-11/12 border-b-2 py-4">
        <h1 className="text-4xl font-bold">Sound Hub</h1>
      </header>
      <main className="mx-auto w-11/12 space-y-8 py-4">
        <Link
          href="/upload"
          className="block w-full bg-pink-400 p-2 text-center text-white shadow-md"
        >
          Upload sound
        </Link>
        <div>
          <h2 className="text-3xl font-semibold">Sounds</h2>
          <ul>
            {soundsData.map((sound) => {
              return (
                <ListItem
                  key={sound.key}
                  soundKey={sound.key}
                  title={sound?.metadata?.title as string}
                  description={sound?.metadata?.description as string}
                />
              );
            })}
          </ul>
        </div>
      </main>
    </>
  );
}
