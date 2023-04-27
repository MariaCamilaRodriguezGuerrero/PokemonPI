import React, { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getPokemonById,deletePokemon} from "../../redux/actions"
import { useParams } from 'react-router-dom';


function Detail (){
    const {id}=useParams()

    const dispatch = useDispatch();
    const thePokemon = useSelector((state) => state.pokemon)

    useEffect(() => {
        dispatch(getPokemonById(id));
        return()=> dispatch (deletePokemon())
      }, [id]);

      console.log(thePokemon)
      
      
        return(
            <div>
                <h1>ESTA ES LA INFROMACIÓN DE TU POKEMON {id}</h1>
                <h1>nombre: {thePokemon.name}</h1>  
                <h1>id: {thePokemon.id}</h1> 
                <h1>vida: {thePokemon.life}</h1>
                <h1>ataque: {thePokemon.attack}</h1> 
                <h1>defensa: {thePokemon.defense}</h1> 
                <h1>velocidad: {thePokemon.speed}</h1> 
                <h1>altura: {thePokemon.height}</h1> 
                <h1>peso: {thePokemon.weight}</h1> 
                <h1>tipo: {thePokemon.types}</h1> 
                <img src={thePokemon.image} alt="img not found"/>
                        
    
    
            </div>
        )
      
        
      
    
}
export default Detail;