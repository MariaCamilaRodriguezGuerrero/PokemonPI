import axios from "axios";

export const GET_POKEMONS = "GET_POKEMONS"
export const GET_POKEMONS_BY_ID ="GET_POKEMONS_BY_ID"
export const DELETE_POKEMON ="DELETE_POKEMON"
export const GET_POKEMON_BY_NAME = "GET_POKEMON_BY_NAME"

export const deletePokemon = ()=>{
  return(dispatch)=>
  dispatch ({ type: DELETE_POKEMON }) 
}

export const getPokemonById =(id)=>{
  const endpoint = `http://localhost:3001/pokemons/`+id

  return async function (dispatch){
    const pokemonById = await axios.get(endpoint)
    const thePokemon = pokemonById.data
    dispatch ({ type: GET_POKEMONS_BY_ID, payload: thePokemon })   
  }  
}

export const getPokemonsByName = (name)=>{
  const endpoint= `http://localhost:3001/pokemons?name=`+name
  return async function(dispatch){
    const pokemonByName = await axios.get(endpoint)
    const pokemon = pokemonByName.data
    dispatch({type:GET_POKEMON_BY_NAME,payload:pokemon})
  }  
}

export const getAllPokemon = () => {
  return async function (dispatch) {
    const apiPokemons = await axios.get("http://localhost:3001/pokemons");
    const pokemons =  apiPokemons.data.map((pokemon) => {
      return {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.image,
        types:pokemon.types,
        attack:pokemon.attack,
        life:pokemon.life,
        defense:pokemon.defense,
        speed:pokemon.speed,
        weight:pokemon.weight,
        height:pokemon.height
      };
    });
    dispatch({ type: GET_POKEMONS, payload: pokemons });
  };
};

