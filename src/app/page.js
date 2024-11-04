"use client";
import usePokemonApi from "@/hooks/usePokemonApi";
import useBerryApi from "@/hooks/useBerryApi";
import { useEffect } from "react";
import homeStyles from "./page.module.css";
import PokemonCard from "@/Pokemon/pokemonCard";

import BerryCard from "@/Pokemon/berryCard";

export default function Home() {
  const pokeData = usePokemonApi();
  const berryData = useBerryApi();

  useEffect(() => {
    if (pokeData.totalPokemonCount === 0) {
      pokeData.getNumberOfPokemon();
    }
    if (!pokeData.randomPokemon.length) {
      pokeData.getRandomPokemon(3);
    }
  }, [pokeData]);

  useEffect(() => {
    if (berryData.totalBerryCount === 0) {
      berryData.getNumberOfBerry();
    }
    if (!berryData.randomBerry.length) {
      berryData.getRandomBerry(3);
    }
  }, [berryData]);

  const randomPokemonListJsx = pokeData.randomPokemon.map(function (pokemon) {
    const quickInfo = pokeData.getPokemonQuickInfo(pokemon);
    return (
      <PokemonCard
        key={`poke-card-${quickInfo.id}`}
        id={quickInfo.id}
        name={quickInfo.name}
        img={quickInfo.img}
        types={quickInfo.types}
      />
    );
  });

  const randomBerryListJsx = berryData.randomBerry.map(function (berry) {
    const berryInfo = berryData.getBerryQuickInfo(berry);
    return (
      <BerryCard
        key={`berry-card-${berryInfo.id}`}
        id={berryInfo.id}
        name={berryInfo.name}
      />
    );
  });

  return (
    <main className={homeStyles.mainContent}>
      <h1>Pokemon Showcase</h1>

      <section>{randomPokemonListJsx}</section>

      <h4>Honor Part</h4>
      <section>{randomBerryListJsx}</section>
    </main>
  );
}
