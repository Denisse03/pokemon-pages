"use client";
import React, { useEffect, useState } from "react";
import searchStyle from "@/app/Search/search.module.css";

export default function Search() {
  // State tracking pokemon data pulled from api
  const [pokemon, setPokemon] = useState({ sprites: {} });

  const [pokemons, setPokemons] = useState({
    pokemon_species: [],
  });

  const [pokemoned, setPokemoned] = useState({
    pokemon_species: [],
  });

  const [pokemonBerry, setPokemonBerry] = useState({ flavors: {} });

  // State tracking user search terms from input
  const [searchTerm, setSearchTerm] = useState("");

  const [eggSearch, setEggSearch] = useState("");

  const [habSearch, setHabSearch] = useState("");

  const [berrySearch, setberrySearch] = useState("");

  function changeSearchTerm(e) {
    setSearchTerm(e.currentTarget.value.toLowerCase());
  }

  function changeEggSearch(e) {
    setEggSearch(e.currentTarget.value.toLowerCase());
  }

  function changehabSearch(e) {
    setHabSearch(e.currentTarget.value.toLowerCase());
  }

  function changeberrySearch(e) {
    setberrySearch(e.currentTarget.value.toLowerCase());
  }

  async function searchForPokemonByHab() {
    try {
      const habData = await fetch(
        `https://pokeapi.co/api/v2/pokemon-habitat/${habSearch}`
      );
      const pokehabDataFormatted = await habData.json();
      console.log(pokehabDataFormatted);

      setPokemoned(pokehabDataFormatted);
    } catch (error) {
      setPokemoned({ name: habSearch, pokemon_species: [] });
    }
  }

  async function searchForPokemonByEgg() {
    try {
      const eggData = await fetch(
        `https://pokeapi.co/api/v2/egg-group/${eggSearch}`
      );
      const pokeEggDataFormatted = await eggData.json();

      setPokemons(pokeEggDataFormatted);
    } catch (error) {
      setPokemons({ name: eggSearch, pokemon_species: [] });
    }
  }

  async function searchForPokemonByName() {
    try {
      const rawData = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${searchTerm}`
      );
      const pokeDataFormatted = await rawData.json();

      setPokemon(pokeDataFormatted);
    } catch (error) {
      setPokemon({ name: searchTerm, sprites: {} });
    }
  }

  // async function searchForPokemonByberry() {
  //   try {
  //     const berryData = await fetch(
  //       `https://pokeapi.co/api/v2/berry/${berrySearch}`
  //     );
  //     const pokeDataFormatted = await berryData.json();
  //     setPokemonBerry(pokeDataFormatted);
  //   } catch (error) {
  //     setPokemonBerry({ name: berrySearch, sprites: {} });
  //   }
  // }

  const pokeHabJSX = pokemoned.pokemon_species
    .map((habObj) => habObj.name)
    .join(", ");

  const pokeEggJSX = pokemons.pokemon_species
    .map((eggObj) => eggObj.name)
    .join(", ");

  return (
    <main>
      <div className={searchStyle.searchFeature}>
        <h1>Pokemon Page</h1>
        <div>
          <input
            type="search"
            id="search"
            name="search"
            value={searchTerm}
            placeholder="Name Search"
            onChange={changeSearchTerm}
          />
          <input
            type="button"
            value="Search"
            onClick={searchForPokemonByName}
          />

          <h3>{pokemon.name}</h3>
          <img src={pokemon.sprites.front_default} />
        </div>

        <div>
          <input
            type="search"
            id="egg"
            name="eggSearch"
            value={eggSearch}
            placeholder="egg Search"
            onChange={changeEggSearch}
          />
          <input type="button" value="Search" onClick={searchForPokemonByEgg} />

          <p>{pokeEggJSX}</p>
        </div>

        <div>
          <input
            type="search"
            id="hab"
            name="habSearch"
            value={habSearch}
            placeholder="hab Search"
            onChange={changehabSearch}
          />
          <input type="button" value="Search" onClick={searchForPokemonByHab} />

          <p>{pokeHabJSX}</p>
        </div>
        {/* 
        <div>
          <input
            type="search"
            id="berry"
            name="berrySearch"
            value={berrySearch}
            placeholder="berry Search"
            onChange={changeberrySearch}
          />
          <input
            type="button"
            value="Search"
            onClick={searchForPokemonByberry}
          />

      
          <p>{pokemonBerry.flavors}</p>
         
        </div> */}
      </div>
    </main>
  );
}
