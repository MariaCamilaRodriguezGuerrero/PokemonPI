const axios = require("axios")
const URL = "https://pokeapi.co/api/v2/pokemon"
const {Pokemon, Type} = require("../db")


const getPokemons = async (req, res) => {
    const { name } = req.query
    if (!name) {
        try {
            const response = await axios.get(`${URL}?offset=0&limit=5`)
            const pokemons = response.data.results;
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
                    types: resp.data.types.map(ty => ty.type.name).join(", ")
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

            res.status(200).json([...pokemonDB,...pokemonLink])
        } catch (error) {
            res.status(400).send("errorcito")
        }
    } else {
        const nombre = name.toLowerCase()
        try {
            const resp = await axios.get(`${URL}/${nombre}`)
            const pokemonSearched = {
                id: resp.data.id,
                name: resp.data.name,
                image: resp.data.sprites.other.dream_world.front_default,
                life: resp.data.stats[0].base_stat,
                attack: resp.data.stats[1].base_stat,
                defense: resp.data.stats[2].base_stat,
                speed: resp.data.stats[5].base_stat,
                weight: resp.data.weight,
                height: resp.data.height,
                types: resp.data.types.map(ty => ty.type.name).join(", ")
            }

            const pokemonSearchedDB =await Pokemon.findOne({
                where:{name:nombre},
                include:{
                    model:Type,
                    attributes:["name"],
                    through:{
                        attributes:[]
                    }
                }                
            })
            res.status(200).json([pokemonSearched,pokemonSearchedDB])
        } catch (error) {
            res.status(400).send("no se encontro un pokemon con ese nombre")
        }
    }
}



module.exports = { getPokemons }