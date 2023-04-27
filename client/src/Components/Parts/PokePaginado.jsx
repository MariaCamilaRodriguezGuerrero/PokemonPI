import React from 'react'


const PokePaginado = ({page, setPage, max}) => {
    const pages = Array.from({length: max}, (_, i) => i + 1);
  return (
    <div >
    <button  disabled={page === 1} onClick={() =>{if(page>1){setPage(page-1)}}}>{"<"}</button>
    {/* Mostrar botones para cada página */}
    {pages.map((paginas) => (
      <button
        key={paginas}        
        onClick={() => setPage(paginas)}>{paginas}
      </button>
    ))}
    <button  disabled={page === max? true:false} onClick={() => setPage(page + 1)}>{">"}</button>
  </div>
  )
}
export default PokePaginado