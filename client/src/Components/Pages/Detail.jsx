import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemonById, deletePokemon } from "../../redux/actions"
import { useParams } from 'react-router-dom';


function Detail() {
    const { id } = useParams()

    const dispatch = useDispatch();
    const thePokemon = useSelector((state) => state.pokemon)

    useEffect(() => {
        dispatch(getPokemonById(id));
        return () => dispatch(deletePokemon())
    }, [id]);

    let tipos =""

    if(thePokemon.types){
        tipos=thePokemon.types
    } else if (thePokemon.Types){
        tipos = thePokemon.Types.map(types=>types.name)  
        tipos=tipos.join(" and ")      
    }


    return (
        <div>

            <div className='welcome-text'>
                <h1>ESTA ES LA INFROMACIÓN DE TU POKEMON</h1>
            </div>


            <div className="container-detail">

                <div className='info'>

                    <h1>nombre: {thePokemon.name}</h1>
                    <h1>#  {thePokemon.id}</h1>
                    <h1>❣️: {thePokemon.life}</h1>
                    <h1>⚔: {thePokemon.attack}</h1>
                    <h1>🛡: {thePokemon.defense}</h1>
                    <h1>👣: {thePokemon.speed}</h1>
                    <h1>📊: {thePokemon.height}</h1>
                    <h1>⚖: {thePokemon.weight}</h1>
                    <h1>🧬:{tipos}</h1>
                    
                    
                </div>

                <div className='imagen'>
                    <img src={thePokemon.image} alt="img not found" />
                    <h1>#:id   ❣️:Vida</h1>
                    <h1>⚔:Ataque    🛡:Defensa</h1>                    
                    <h1>👣:Velocidad  🧬:Tipos</h1>
                    <h1>📊:Altura  ⚖:Peso</h1>
                    

                </div>

            </div>




        </div>

    )




}
export default Detail;