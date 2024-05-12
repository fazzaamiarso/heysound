export default function Header() {
  return (
    <header className="flex flex-col items-center justify-between gap-1 rounded-md bg-white px-4 py-6 md:flex-row">
      <h1 className="text-2xl font-bold">Hey!Sound</h1>
      <div className="flex gap-1 text-sm">
        <span>
          Made by{" "}
          <a
            href="https://github.com/fazzaamiarso"
            target="_blank"
            className="text-orange-600 underline"
          >
            Fazza Razaq Amiarso.
          </a>
        </span>
        <span>
          {" "}
          Inspired by{" "}
          <a
            href="https://50hacks.co"
            target="_blank"
            className="text-orange-600 underline"
          >
            50hacks.co
          </a>
        </span>
      </div>
    </header>
  );
}
