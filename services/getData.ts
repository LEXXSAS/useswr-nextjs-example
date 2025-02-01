export const getDatasBySearch = async (search: string) => {
  const response = await fetch(
    `/api/pokemons?q=${search}`
  );

  if (!response.ok) throw new Error("Unable to fetch posts.");

  return response.json();
};

const endPoint = "https://pokeapi.co/api/v2/pokemon/?limit=24";

export async function fetchAllDataWithPokemonImage() {
  const res = await fetch(endPoint);
  const { results } = await res.json();
  const data = results.map(
    (item: { name: string; url: string }, index: any) => {
      const pokemonId = ("00" + (index + 1)).slice(-3);
      const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokemonId}.png`;
      return { ...item, image };
    }
  );
  return data;
}
