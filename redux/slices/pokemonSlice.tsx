import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IPokemon {
  name: string;
  url: string;
  image: string;
}

interface IState {
  pokemons: {
    name: string;
    url: string;
    image: string;
  }[];
  defaultPokemons: {
    name: string;
    url: string;
    image: string;
  }[];
}

const initialState: IState = {
  pokemons: [],
  defaultPokemons: []
}

const pokemonSlice = createSlice({
  name: "pokemons",
  initialState,
  reducers: {
    addPokemons: (state, action: PayloadAction<any>) => {
      if (!action.payload) return;
      action.payload.map((pokemon: IPokemon) => state.pokemons.push(pokemon));

      // state.push(action.payload);
    },
    searchPokemons: (state, action: PayloadAction<any>) => {
      // if (!action.payload) return;
      // return state.pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(action.payload.toLowerCase()));
    },
    addPokemonsFromLocal: (state, action: PayloadAction<any>) => {
      if (action.payload === "") return;
      state.pokemons = action.payload
    },
    setDefaultState: (state, action: PayloadAction<any>) => {
      state.defaultPokemons = action.payload
    }
  },
});

export const { addPokemons, searchPokemons, addPokemonsFromLocal, setDefaultState } = pokemonSlice.actions;
export default pokemonSlice.reducer;
