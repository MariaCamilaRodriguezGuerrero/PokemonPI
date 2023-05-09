import React, { useEffect, useState } from 'react';
import PokeSearchBar from '../Parts/PokeSearchBar';
import PokeFiltros from "../Parts/PokeFiltros"
import { PokeCard } from '../Parts/PokeCard';
import PokePaginado from '../Parts/PokePaginado';
import pokeImage from '../images/pokebolas.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPokemon } from '../../redux/actions';

function Home(props) {
  

  const [page, setPage] = useState(1);
  const [perPage] = useState(12);
  const [isPageOne, setIsPageOne] = useState(true);

  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state);

  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;

  const max = Math.ceil(allPokemons?.pokemons.length / perPage);

  const pokemonsComplete = allPokemons?.pokemons.slice(startIndex, endIndex);


  useEffect(() => {
    dispatch(getAllPokemon());
  }, [dispatch]);

  useEffect(() => {
    setIsPageOne(page === 1);
  }, [page]);

  return (
    <div >
      <h1 className='titulo'>Welcome to Pokemon center</h1>
      {isPageOne &&<h1>Pokefiltros y Pokebusqueda</h1>}
      <PokeSearchBar setPage={setPage}/>
      <div>
        <div>
          
          <PokeFiltros setPage={setPage}/>
        </div>    
        <main>
          <section className="poke-card-container">
          {pokemonsComplete.length ? (
            pokemonsComplete.map((pokemon, index) => (
              <PokeCard
                key={index}
                name={pokemon.name}
                image={pokemon.image}
                id={pokemon.id}
                type={pokemon.types}
                
              />
            ))
          ) : (
            <img src={pokeImage} alt="something" />
          )}
          </section>
        </main>
      </div>

      <footer>
        <PokePaginado page={page} setPage={setPage} max={max} />
      </footer>
    </div>
  );
}

export default Home;

// import React, { useEffect, useState } from 'react';
// import PokeSearchBar from '../Parts/PokeSearchBar';
// import PokeFiltros from "../Parts/PokeFiltros"
// import { PokeCard } from '../Parts/PokeCard';
// import PokePaginado from '../Parts/PokePaginado';
// import pokeImage from '../images/pokebolas.jpg';
// import { useDispatch, useSelector } from 'react-redux';
// import { getAllPokemon } from '../../redux/actions';

// function Home(props) {
  

//   const [page, setPage] = useState(1);
//   const [perPage] = useState(12);

//   const dispatch = useDispatch();
//   const allPokemons = useSelector((state) => state);

//   const startIndex = (page - 1) * perPage;
//   const endIndex = startIndex + perPage;

//   const max = Math.ceil(allPokemons?.pokemons.length / perPage);

//   const pokemonsComplete = allPokemons?.pokemons.slice(startIndex, endIndex);


//   useEffect(() => {
//     dispatch(getAllPokemon());
//   }, [dispatch]);

//   return (
//     <div >
//       <h1>Welcome to Pokemon center</h1>
//       <PokeSearchBar/>      
//       <div>
//     <div>
//       <h1>Pokefiltros</h1>
//     <PokeFiltros/>
//     </div>    
//         <main>
//           <section className="poke-card-container">
//           {pokemonsComplete.length ? (
//             pokemonsComplete.map((pokemon, index) => (
//               <PokeCard
//                 key={index}
//                 name={pokemon.name}
//                 image={pokemon.image}
//                 id={pokemon.id}
//                 type={pokemon.types}
                
//               />
//             ))
//           ) : (
//             <img src={pokeImage} alt="something" />
//           )}
//           </section>
//         </main>
//       </div>

//       <footer>
//         <PokePaginado page={page} setPage={setPage} max={max} />
//       </footer>
//     </div>
//   );
// }

// export default Home;



