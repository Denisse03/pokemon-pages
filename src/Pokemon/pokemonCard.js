"use client";

import pokemonStyles from "./pokemon.module.css";
import usePokemonApi from "@/hooks/usePokemonApi";
import Link from "next/link";

export default function PokemonCard({
  id = "",
  img = "",
  name = "",
  types = [],
}) {
  const { favoritePokemon, viewPoke } = usePokemonApi();
  const typesJsx = types.map((typeObj) => typeObj.type.name).join(", ");

  function addButton() {
    favoritePokemon({ id, img, name, types });
  }

  function pokemonToView() {
    viewPoke(id);
  }

  return (
    <div className={pokemonStyles.pokeCard}>
      <img src={img} />
      <div>
        <h4>{name}</h4>
        <p>
          <i>Types: {typesJsx}</i>
        </p>

        <button onClick={addButton}>Add to Favorite</button>
        <Link href="/Pokemon">
          <button onClick={pokemonToView}>Read more Info</button>
        </Link>
      </div>
    </div>
  );
}
