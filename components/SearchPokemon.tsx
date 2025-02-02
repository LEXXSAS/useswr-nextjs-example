"use client";

import { useEffect, useState } from "react";
import { addPokemonsFromLocal, setTypeValue } from "@/redux/slices/pokemonSlice";
import { useDispatch, useSelector } from "react-redux";
import React from "react";

interface IPokemon {
  name: string;
  url: string;
  image: string;
}

const SearchPokemon = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  const typeValue = useSelector((state: any) => state.pokemons.typeValue);
  const defaultPokemons = useSelector((state: any) => state.pokemons.defaultPokemons);

  function searchPokemonsForState(name: string) {
    return defaultPokemons.filter((pokemon: IPokemon) => pokemon.name.toLowerCase().includes(name.toLowerCase()));
  }

  useEffect(() => {
    if (search !== "") {
      localStorage.setItem("searchvalue", search);
      dispatch(setTypeValue({value: 'Выбор типа', label: 'Выбор типа'}))
      async function searchData(search: string) {
        dispatch(addPokemonsFromLocal(searchPokemonsForState(search)))
      }
      searchData(search);
    } else {
      localStorage.removeItem("searchvalue");
      if (typeValue.value === 'Выбор типа') {
        dispatch(addPokemonsFromLocal(defaultPokemons));
      }
    }
  }, [search]);

  useEffect(() => {
    if (typeValue.value !== 'Выбор типа') {
      setSearch('');
    }
  }, [typeValue])

  return (
    <form>
      <input
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[180px] ps-5 p-2 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-green-500"
        type="search"
        placeholder="Введите название..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
    </form>
  );
};

export { SearchPokemon };
