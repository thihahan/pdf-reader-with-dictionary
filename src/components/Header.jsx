export default function Header() {
  return (
    <p>
      Our dictionary API operates under the Creative Commons
      Attribution-ShareAlike 3.0 License (CC BY-SA 3.0). You can find more
      details about this license at{" "}
      <a
        className="underline text-blue-700 font-bold"
        href="https://creativecommons.org/licenses/by-sa/3.0/"
      >
        Creative Commons
      </a>
      . We source our dictionary data from{" "}
      <a
        className="underline text-blue-700 font-bold"
        href="https://en.wiktionary.org/wiki"
      >
        Wiktionary
      </a>{" "}
      and utilize the API provided by{" "}
      <a
        className="underline text-blue-700 font-bold"
        href="https://api.dictionaryapi.dev/"
      >
        DictionaryAPI
      </a>{" "}
      These sources serve as invaluable contributors to the richness and
      accuracy of the information we provide.
    </p>
  );
}
