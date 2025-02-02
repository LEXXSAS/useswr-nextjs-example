'use client';

import React, { useEffect } from "react";

export default function SinglePokemon({pokemonData, slug}: any) {
  return (
    <div className="single-data-card">
    <h3 className="text-xl">{slug}</h3>
    <img
      width={180}
      height={180}
      className="image-single object-contain"
      src={String(
        pokemonData.sprites.other["official-artwork"].front_default
      )}
    />
    </div>
  )
}
