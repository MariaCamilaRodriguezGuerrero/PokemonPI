const URL = "https://pokeapi.co/api/v2/type"
const axios = require("axios")
const {Type} = require("../db")


const getType =async()=>{
    try {
      const response = await axios.get(URL);
      const types = response.data.results.map(type => type.name);
      return types;
    } catch (error) {
      throw new Error('Error al obtener tipos de Pokemon desde la API.');
    }
  }


const getTypes =async (req,res)=>{
    try {
       const typesFromDB = await Type.findAll();
          
       if (typesFromDB.length > 0) {
         const types = typesFromDB.map((type) => type.name);
         res.status(200).send(types);
       }else {
         const typesFromAPI = await getType();
         const types = await Promise.all(typesFromAPI.map(async (typeName) => {
           const type = await Type.create({ name: typeName });
           return type.name;
         }));
         res.status(200).send(types);
       }
     } catch (error) {
       console.error(error);
       res.status(500).send('Internal server error');
     }
 }

 module.exports = { getTypes }