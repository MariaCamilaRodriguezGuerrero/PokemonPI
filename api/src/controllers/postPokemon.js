const URL = "https://pokeapi.co/api/v2/pokemon"
const axios = require("axios")
const {Pokemon, Type} = require("../db")
const postPokemon = async (req,res)=>{
    try {
        const {name,image,life,attack,defense,speed,height,weight,type1,type2}= req.body
        console.log(type1);
    if(!name|| !image || !life || !attack || !defense ||!type1){
        res.status(401).send("completar todos los datos")
    }    
    const oldPokemonDB = await Pokemon.findOne({where:{name}})
    if(oldPokemonDB){ return res.status(402).send("El pokemon que estas creando ya existe en la base de datos")}

    try {
        const oldPokemonLink = await axios.get(`${URL}/${name}`)
        if(oldPokemonLink){return res.status(403).send("El pokemon que estas creando ya existe en la API")}        
    } catch (error) {
        const newPokemon= await Pokemon.create({
            name,
            life,
            image,            
            attack,
            defense,
            speed,
            height,
            weight,                   
        })     

        if(!newPokemon){
           return res.status(400).send(error.message)
        } 

        const typePokemon1 = await Type.findOne({where:{name:type1}})        
        await newPokemon.addType(typePokemon1)
        
        if(type2){
            const typePokemon2 = await Type.findOne({where:{name:type2}})
            await newPokemon.addType(typePokemon2) 
        }
        await newPokemon.save()
        console.log (newPokemon)
        return res.status(200).json(newPokemon)        
    }               
    } catch (error) {
        res.status(400).send("errorcito")
    }   
}
module.exports = { postPokemon }