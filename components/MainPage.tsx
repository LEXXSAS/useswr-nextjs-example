"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useSWR, { preload } from "swr";
import { addAllDetails, addPokemons, setDefaultState, setOriginalTypes } from "@/redux/slices/pokemonSlice";
import { fetchAllDataWithPokemonImage, fetchAllPokemonDetails } from "@/services/getData";
import { typeColor } from "@/utils/colors";
import { PockemonSingleAllDetails } from "@/main";

export default function MainPage() {
  const [pokemonsData, setPokemonsData] = React.useState([]);

  const dispatch = useDispatch();

  const pokemons = useSelector((state: any) => state.pokemons.pokemons);
  const details: PockemonSingleAllDetails[] = useSelector((state: any) => state.pokemons.details);
  
  useEffect(() => {
    if (pokemons) {
      console.log("pokemons", pokemons);
      setPokemonsData(pokemons);
    }
  }, [pokemons]);

  const { data, isLoading, mutate } = useSWR("pokemonstag", fetchAllPokemonDetails, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    revalidateOnReconnect: false
  });

  useEffect(() => {
    if (pokemons && pokemons.length === 0) {
      dispatch(addPokemons(data));
      dispatch(setDefaultState(data));
      dispatch(addAllDetails(data));
    }
  }, [data]);

  useEffect(() => {
    let originalArr = details.map((item) => item.types.map((item) => item.type.name));
    dispatch(setOriginalTypes(originalArr));
  }, [details])

  if (isLoading) return <h1>Loading data...</h1>;

  return (
    <>
      <div className="data-container">
        {pokemonsData &&
          pokemonsData?.map((item: { name: string; url: string; image: string, details: any }) => (
            <div
              className="card-newpage bg-slate-300 w-[100px]"
              key={item.name}
            >
              <Link
                href={`/pokemon/${item.name}`}
              >
                <p>{item.name}</p>
                <img
                  width={90}
                  height={90}
                  src={item.image}
                  className="item-image"
                />
              </Link>
              <div
                className="card-types"
                style={{
                  backgroundColor: typeColor[item.details.types[0]?.type?.name]
                }}>
                <p>
                  {item.details.types[0].type.name}
                </p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
