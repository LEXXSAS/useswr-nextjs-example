import { SearchPokemon } from './SearchPokemon'
import { SelectComponent } from './SelectComponent'

export default function SearchAndSelect() {
  return (
    <div className="search-and-select-wrapper">
      <div className="search-container"><SearchPokemon /></div>
      <div className="select-container"><SelectComponent /></div>
    </div>
  )
}
