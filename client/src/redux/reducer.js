import { GET_POKEMONS, GET_POKEMONS_BY_ID, DELETE_POKEMON, GET_POKEMON_BY_NAME, GET_TYPES, FILTER_ORDER, FILTER_TYPE, FILTER_ORIGIN } from "./actions";


const idRegExp = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;


const filtersHandler = {
    typeFilter: {
        isActive: false,
        value: ""
    },
    originFilter: {
        isActive: false,
        value: ""
    },
    orderFilter: {
        isActive: false,
        value: ""
    }
}


const applyFilters = (filtrados) => {
    let pokemonsFiltrados = [...filtrados]
    if (filtersHandler.typeFilter.isActive) {
        pokemonsFiltrados = pokemonsFiltrados.filter(type => type.types.includes(filtersHandler.typeFilter.value))
    }

    if (filtersHandler.originFilter.isActive) {
        if (filtersHandler.originFilter.value === "API") pokemonsFiltrados = pokemonsFiltrados.filter(poke => !idRegExp.test(poke.id))
        if (filtersHandler.originFilter.value === "BDD") pokemonsFiltrados = pokemonsFiltrados.filter(poke => idRegExp.test(poke.id))
    }


    if(filtersHandler.orderFilter.isActive){  //Tercer filtro

        //EL valor que llega por payload puede ser: "A" , "D" , "a_A" , "a_D" esto esta difinido en componente 
 switch (filtersHandler.orderFilter.value) {
    case "A":
        pokemonsFiltrados.sort((a,b)=> {      //A = Orden alfabetico de manera ascendete
            if (a.name < b.name) {
                return -1;
              }
              if (a.name > b.name) {
                return 1;
              }
              return 0;
        }) 
        break;

    case "D":                          //D = Orden alfabetico de manera descendete
        pokemonsFiltrados.sort((a,b)=> {
            if (a.name > b.name) {
                return -1;
              }
              if (a.name < b.name) {
                return 1;
              }
              return 0;
        })
        break; 
    
    case "A_A":                       
        pokemonsFiltrados.sort((a,b)=> a.attack - b.attack)
        break; 

    case "A_D":                       //H_D= Ordena por healScore de manera descendente
        pokemonsFiltrados.sort((a,b)=> b.attack - a.attack)
        break; 
    
 
    default:
        break;
 }

}





    return pokemonsFiltrados
}



const initialState = {
    pokemons: [],
    types: [],
    originalPokemons: [],
    pokemon: {},
};


const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_TYPES:
            return {
                ...state,
                types: action.payload
            }
        case GET_POKEMONS:
            return {
                ...state,
                pokemons: action.payload,
                originalPokemons: action.payload
            }
        case GET_POKEMONS_BY_ID:
            return {
                ...state, pokemon: action.payload
            }

        case GET_POKEMON_BY_NAME:
            return {
                ...state, pokemons: action.payload

            }
        case DELETE_POKEMON:
            return {
                ...state, pokemon: {}
            }
        case FILTER_TYPE:
            if (action.payload !== "default") {
                filtersHandler.typeFilter.isActive = true
                filtersHandler.typeFilter.value = action.payload
                let filtrados = applyFilters([...state.originalPokemons])
                return {
                    ...state,
                    pokemons: filtrados
                }
            } else {
                filtersHandler.typeFilter.isActive = false
                let filtrados = applyFilters([...state.originalPokemons])
                return {
                    ...state,
                    pokemons: filtrados
                }
            }
        case FILTER_ORIGIN:
            if (action.payload !== "default") {
                filtersHandler.originFilter.isActive = true
                filtersHandler.originFilter.value = action.payload
                let filtrados = applyFilters([...state.originalPokemons])
                return {
                    ...state,
                    pokemons: filtrados
                }
            } else {
                filtersHandler.originFilter.isActive = false
                let filtrados = applyFilters([...state.originalPokemons])
                return{
                    ...state,
                    pokemons:filtrados
                }

            }
        case FILTER_ORDER:
            if(action.payload !== "default"){
                filtersHandler.orderFilter.isActive = true
                filtersHandler.orderFilter.value = action.payload
                let filtrados = applyFilters([...state.originalPokemons])
                return {
                    ...state,
                    pokemons: filtrados
                }

            }else{
                filtersHandler.orderFilter.isActive = false
                let filtrados = applyFilters([...state.originalPokemons])
                return{
                    ...state,
                    pokemons:filtrados
                }

            }    

        default:
            return { ...state };
    }
}


export default rootReducer;