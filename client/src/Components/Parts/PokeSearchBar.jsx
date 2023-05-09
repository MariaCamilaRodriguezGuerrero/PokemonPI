

import React,{useState} from 'react';
import { useDispatch} from 'react-redux'
import { getAllPokemon,getPokemonsByName} from '../../redux/actions'

  const PokeSearchBar = ({setPage}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();

    const handleChange = (event) => {
      if(event.target.value===""){
        dispatch(getAllPokemon())
      }
      setSearchTerm(event.target.value);
    };

    
    const handleSearch = () => {
      dispatch(getPokemonsByName(searchTerm));
      setPage(1)
    };

    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        if(searchTerm.length!==0){
          handleSearch();
        }
        // else dispatch((getAllPokemon()));
      }
    };

  return (
    <div>
       <input
        className="poke-searchbar"
        placeholder="Buscar..."
        value={searchTerm}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
    </div>
  )
}

export default PokeSearchBar