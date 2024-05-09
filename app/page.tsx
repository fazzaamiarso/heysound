import { getStore } from "@netlify/blobs";
import Link from "next/link";

async function getSounds() {
  const res = getStore("something");
  const list = await res.list();

  const sounds = await Promise.all(
    list.blobs.map(async (blob) => {
      const data = await res.get(blob.key, { type: "json" });
      return data;
    }),
  );

  return sounds;
}

export default async function Home() {
  const sounds = await getSounds();

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
          <ul className="space-y-4">
            {sounds.map((sound) => {
              return (
                <li key={sound.title} className="p-4 ring-1">
                  <h3 className="font-semibold">{sound.title}</h3>
                  <p>{sound.description}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </main>
    </>
  );
}
