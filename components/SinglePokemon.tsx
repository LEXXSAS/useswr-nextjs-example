'use client';

import React, { useEffect } from "react";

export default function SinglePokemon({pokemonData, slug}: any) {
  const [isImageLoading, setImageLoading] = React.useState(true);

  useEffect(() => {
    setImageLoading(false);
  }, [pokemonData]);

  return (
    <div className="single-data-card">
    <h3 className="text-xl">{slug}</h3>
    <img
      width={180}
      height={180}
      className={isImageLoading ? "image-single object-contain blur" : "image-single object-contain remove-blur"}
      src={String(
        pokemonData.sprites.other["official-artwork"].front_default
      )}
      onLoad={() => setImageLoading(false)}
    />
    </div>
  )
}
