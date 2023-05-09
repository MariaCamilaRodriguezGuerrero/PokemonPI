import React, {useEffect } from 'react';
import { useSelector } from "react-redux";
import { filterType, filterOrder,filterOrigin} from "../../redux/actions";
import { useDispatch } from "react-redux";
import { getTypes } from "../../redux/actions"

function Filters({setPage}) {

    const types = useSelector((state) => state.types)
    useEffect(() => {
        dispatch(getTypes());
    
      }, []);

    const dispatch = useDispatch()


    const handlerType = (event) => {
        dispatch(filterType(event.target.value))
        setPage(1)
        //console.log("filtro dieta ",event.target.value)
    }
    const handlerOrigin = (event) => {
        dispatch(filterOrigin(event.target.value))
        setPage(1)
        //console.log("filtro origen ",event.target.value)
    }
    const handlerOrder = (event) => {
        dispatch(filterOrder(event.target.value))
        setPage(1)
        //console.log("filtro orden ",event.target.value)
    }

    return (
        <div className="filters-container">

            <select className="filter-select" onChange={handlerType}>
                <option value="default">Select pokemon type</option>
                {types.map((type, index) => (
                    <option key={index} value={type} > {type} </option>
                ))}
            </select>

            <select  id="origin" className="filter-select" onChange={handlerOrigin} >
                <option value="default">Select origin</option>
                <option value="API">from poke Api</option>
                <option value="BDD">from BDD</option>
            </select>

            <select  id="order" className="filter-select" onChange={handlerOrder}>
                <option value="default">Select order</option>
                <option value="A">Ascendent</option>
                <option value="D">Descendent</option>
                <option value="A_A">Ataque(↑) </option>
                <option value="A_D">Ataque(↓) </option>
            </select>



        </div>
    );
}

export default Filters;