export default function Header() {
  return (
    <header className="flex items-center justify-between rounded-md bg-white px-4 py-6">
      <h1 className="text-2xl font-bold">Hey!Sound</h1>
      <div className="flex text-sm ">
        <span>
          Made by{" "}
          <a
            href="https://github.com/fazzaamiarso"
            target="_blank"
            className="underline"
          >
            Fazza Razaq Amiarso
          </a>
        </span>
        <span>
          . Inspired by{" "}
          <a href="https://50hacks.co" target="_blank" className="underline">
            50hacks.co
          </a>
        </span>
      </div>
    </header>
  );
}
