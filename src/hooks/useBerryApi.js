"use client";
import { createContext, useContext, useState } from "react";

const BerryContext = createContext();

export function BerryProvider({ children }) {
  const [berryState, setberryState] = useState({
    totalBerryCount: 0,
    randomBerry: [],
  });

  async function getNumberOfBerry() {
    const berryResponse = await fetch(
      `https://pokeapi.co/api/v2/berry/?limit=1`
    );
    const { count: berryCount } = await berryResponse.json();
    setberryState({ ...berryState, totalBerryCount: berryCount });
  }

  async function getRandomBerry(limit = 5) {
    if (!berryState.totalBerryCount) return [];
    const berryIds = {};
    let berryIndex = 0;

    while (berryIndex < limit) {
      const randIds = parseInt(Math.random() * berryState.totalBerryCount) + 1;
      if (!berryIds[randIds]) {
        const berryRequest = await fetch(
          `https://pokeapi.co/api/v2/berry/${randIds}`
        );
        berryIds[randIds] = await berryRequest.json();
        berryIndex++;
      }
    }

    setberryState({
      ...berryState,
      randomBerry: Object.values(berryIds),
    });
  }

  function getBerryQuickInfo(berryData) {
    return {
      name: berryData.name,
      id: berryData.id,
    };
  }

  const berryValues = {
    ...berryState,
    getNumberOfBerry,
    getRandomBerry,
    getBerryQuickInfo,
  };

  return (
    <BerryContext.Provider value={berryValues}>
      {children}
    </BerryContext.Provider>
  );
}

export default function useBerryApi() {
  return useContext(BerryContext);
}
