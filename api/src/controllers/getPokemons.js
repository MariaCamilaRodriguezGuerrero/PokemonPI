const axios = require("axios")
const URL = "https://pokeapi.co/api/v2/pokemon"
const {Pokemon, Type} = require("../db")


const getPokemons = async (req, res) => {
    const { name } = req.query
    try {
        const response = await axios.get(`${URL}?offset=0&limit=13`)
        const pokemons = response.data.results;
// console.log("estos son los pokemons: "+pokemons);

        const pokemonLink = await Promise.all(pokemons.map(async (poke) => {
            const resp = await axios.get(poke.url)            
            return {
                id: resp.data.id,
                name: resp.data.name,
                image: resp.data.sprites.other.dream_world.front_default,
                life: resp.data.stats[0].base_stat,
                attack: resp.data.stats[1].base_stat,
                defense: resp.data.stats[2].base_stat,
                speed: resp.data.stats[5].base_stat,
                weight: resp.data.weight,
                height: resp.data.height,
                types: resp.data.types.map(ty => ty.type.name).join(" y ")
            }
        })) 
        
        const pokemonDB =await Pokemon.findAll({
            include:{
                model:Type,
                attributes:["name"],
                through:{
                    attributes:[]
                }
            }
        })

        const tipe1 = pokemonDB.map(poke=>poke.Types[0].name)
        const tipe2 = pokemonDB.map(poke=>poke.Types[1].name)

       const pokemonDBWhitTipes=pokemonDB.map((poke) => {                  
        return {
            id: poke.id,
            name: poke.name,
            image: poke.image,
            life: poke.life,
            attack: poke.attack,
            defense: poke.defense,
            speed: poke.speed,
            weight: poke.height,
            height: poke.weight,
            types:poke.Types[0].name+ " y "+poke.Types[1].name
        }
    } )



        const allPokemons = [...pokemonDBWhitTipes,...pokemonLink]

        if (!name) {
           return res.status(200).json(allPokemons)
        } else if(name){
            const nombre = name.toLowerCase()
            const pokemonByName = allPokemons.filter((poke)=>poke.name===nombre)
            return res.status(200).json(pokemonByName)
        }

        
    } catch (error) {
        res.status(400).send(error.message)
    }
}
 
    




module.exports = { getPokemons }




