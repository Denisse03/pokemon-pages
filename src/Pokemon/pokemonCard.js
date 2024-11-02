"use client";

import pokemonStyles from "./pokemon.module.css";

export default function PokemonCard({
  img = "",
  name = "",
  ability = "",
  types = [],
}) {
  const typesJsx = types.map((typeObj) => typeObj.type.name).join(", ");

  function addButton() {
    console.log("hi", img, name, types);
  }

  return (
    <div className={pokemonStyles.pokeCard}>
      <img src={img} />
      <div>
        <h4>{name}</h4>
        <p>
          <i>Types: {typesJsx}</i>
        </p>
        <p>{ability}</p>
        <button onClick={addButton}>Add to Favorite</button>
      </div>
    </div>
  );
}
