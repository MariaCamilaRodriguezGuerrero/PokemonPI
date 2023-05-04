import { Link } from "react-router-dom";
import pokeImage from "../images/pokebolas.jpg"

export function PokeCard({ name, image, id, type }){
    return(
        
        <div className="poke-card">           
            
         <Link to={`/detail/${id}`}> <h2>{name}</h2></Link>
                  
         <img src={image ? image : pokeImage} alt="img not found" />
         <h2>Tipo: {type}</h2>

        </div>
    )
}