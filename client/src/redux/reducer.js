import { GET_POKEMONS,GET_POKEMONS_BY_ID,DELETE_POKEMON,GET_POKEMON_BY_NAME} from "./actions";

const initialState = {
    pokemons: [],
    types: [],
    originalPokemons: [],
    pokemon: {},
};


const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_POKEMONS:
            return {
                ...state,
                pokemons: action.payload,
                originalPokemons: action.payload
            }
        case GET_POKEMONS_BY_ID:
            return{
                ...state, pokemon:action.payload
            }

        case GET_POKEMON_BY_NAME:
            return{
                ...state, pokemons:action.payload

            }     
        case DELETE_POKEMON:
            return{
                ...state,pokemon:{}
            }   

        default:
            return { ...state };
    }
}


export default rootReducer;