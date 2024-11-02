"use client";
import usePokemonApi from "@/hooks/usePokemonApi";

export default function Pokemon() {
  const { pokemonInfo } = usePokemonApi();
  console.log(pokemonInfo);
  return (
    <main>
      <h1>More Detail</h1>
    </main>
  );
}
