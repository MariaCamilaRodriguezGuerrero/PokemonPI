const axios = require("axios")
const URL = "https://pokeapi.co/api/v2/pokemon"
const { Pokemon, Type } = require("../db")

const getPokemonById = async (req, res) => {
    const { id } = req.params
    try {
        if (isNaN(id)) {            
            const pokemonDB = await Pokemon.findOne({
                where: { id: id },
                include: {
                    model: Type,
                    attributes: ["name"],
                    through: {
                        attributes: []
                    }}})

            console.log(pokemonDB.Types[0]);
            console.log(pokemonDB.Types[1]);
                               

            res.status(200).json(pokemonDB)
        } else {
            const resp = await axios.get(`${URL}/${id}`)
            const pokemonLink = {
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
            return res.status(200).json(pokemonLink)
        }
    } catch (error) {
        res.status(400).send("no existe ese pokemon")
    }
}

module.exports = { getPokemonById }