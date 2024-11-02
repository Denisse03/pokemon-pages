"use client";
import React, { useEffect, useState } from "react";
import searchStyle from "@/app/Search/search.module.css";

export default function Search() {
  const [pokemon, setPokemon] = useState({ sprites: {} });

  const [pokemons, setPokemons] = useState({ sprites: {} });

  const [pokemoned, setPokemoned] = useState({ sprites: {} });

  const [searchTerm, setSearchTerm] = useState("");

  const [searchTerms, setSearchTerms] = useState("");

  const [searchTermed, setSearchTermed] = useState("");

  const [eggSearch, setEggSearch] = useState("");

  const [habSearch, sethabSearch] = useState("");

  const [pokemonEncounters, setPokemonEncounters] = useState([]);

  const [eggEncounters, seteggEncounters] = useState([]);

  const [habEncounters, sethabEncounters] = useState([]);

  function changeSearchTerm(e) {
    setSearchTerm(e.currentTarget.value.toLowerCase());
  }

  function changeEggSearch(e) {
    setEggSearch(e.currentTarget.value.toLowerCase());
  }

  function changehabSearch(e) {
    sethabEncounters(e.currentTarget.value.toLowerCase());
  }

  async function searchForPokemonByHab() {
    try {
      const habData = await fetch(
        `https://pokeapi.co/api/v2/pokemon-habitat/${habSearch}`
      );
      const pokehabDataFormatted = await habData.json();

      setPokemoned(pokehabDataFormatted);
    } catch (error) {
      setPokemoned({ name: habSearch, sprites: {} });
    }
  }

  useEffect(
    function () {
      if (pokemoned.id) {
        const habData = fetch(
          `https://pokeapi.co/api/v2/pokemon-habitat/${pokemoned.id}`
        )
          .then((habData) => {
            return habData.json();
          })
          .then((habEncounters) => {
            sethabEncounters(habEncounters);
          })
          .catch((e) => {
            sethabEncounters([]);
          });
      } else {
        sethabEncounters([]);
      }
    },
    [pokemoned]
  );

  async function searchForPokemonByEgg() {
    try {
      const eggData = await fetch(
        `https://pokeapi.co/api/v2/egg-group/${eggSearch}`
      );
      const pokeEggDataFormatted = await eggData.json();

      setPokemons(pokeEggDataFormatted);
    } catch (error) {
      setPokemons({ name: eggSearch, sprites: {} });
    }
  }

  useEffect(
    function () {
      if (pokemons.id) {
        const eggData = fetch(
          `https://pokeapi.co/api/v2/egg-group/${pokemons.id}`
        )
          .then((eggData) => {
            return eggData.json();
          })
          .then((eggEncounters) => {
            seteggEncounters(eggEncounters);
          })
          .catch((e) => {
            seteggEncounters([]);
          });
      } else {
        seteggEncounters([]);
      }
    },
    [pokemon]
  );

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

  useEffect(
    function () {
      if (pokemon.id) {
        const rawData = fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.id}/encounters`
        )
          .then((rawData) => {
            return rawData.json();
          })
          .then((pokeEncounters) => {
            setPokemonEncounters(pokeEncounters);
          })
          .catch((e) => {
            setPokemonEncounters([]);
          });
      } else {
        setPokemonEncounters([]);
      }
    },
    [pokemon]
  );

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

          <h3>{pokemons.name}</h3>
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

          <h3>{pokemoned.name}</h3>
        </div>
      </div>
    </main>
  );
}
