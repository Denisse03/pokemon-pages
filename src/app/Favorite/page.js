"use client";
import React from "react";
import searchStyle from "@/app/Search/search.module.css";
import usePokemonApi from "@/hooks/usePokemonApi";
import PokemonCard from "@/Pokemon/pokemonCard";

export default function Favorite() {
  const { favorites } = usePokemonApi();

  const FavPokemonListJsx = favorites.map(function (pokemon) {
    return (
      <PokemonCard
        key={`poke-card-${pokemon.id}`}
        id={pokemon.id}
        name={pokemon.name}
        img={pokemon.img}
        types={pokemon.types}
      />
    );
  });
  return (
    <main>
      <div className={searchStyle.searchFeature}>
        <h1>Pokemon Favorites</h1>
        <section>{FavPokemonListJsx}</section>
      </div>
    </main>
  );
}
