"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useSWR from "swr";
import { addPokemons, setDefaultState } from "@/redux/slices/pokemonSlice";
import { fetchAllDataWithPokemonImage } from "@/services/getData";

export default function MainPage() {
  const [pokemonsData, setPokemonsData] = React.useState([]);

  const dispatch = useDispatch();

  const pokemons = useSelector((state: any) => state.pokemons.pokemons);
  
  useEffect(() => {
    if (pokemons) {
      setPokemonsData(pokemons);
    }
  }, [pokemons]);

  const { data, isLoading, mutate } = useSWR("pokemonstag", fetchAllDataWithPokemonImage, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    revalidateOnReconnect: false
  });

  useEffect(() => {
    if (pokemons.length === 0) {
      dispatch(addPokemons(data));
      dispatch(setDefaultState(data));
    }
  }, [data]);

  if (isLoading) return <h1>Loading data...</h1>;

  return (
    <>
      <div className="data-container">
        {pokemonsData &&
          pokemonsData?.map((item: { name: string; url: string; image: string }) => (
            <div
              className="card-newpage bg-slate-300 w-[100px]"
              key={item.name}
            >
              <Link href={`/pokemon/${item.name}`}>
                <p>{item.name}</p>
                <img
                  width={90}
                  height={90}
                  src={item.image}
                  className="item-image"
                />
              </Link>
            </div>
          ))}
          <button onClick={async() => mutate("pokemonstag")}>Mutate</button>
      </div>
    </>
  );
}
