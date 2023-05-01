import React, { useState, useEffect } from 'react';
import axios from "axios";
import { getTypes } from "../../redux/actions"
import { useDispatch, useSelector } from 'react-redux';


function Form() {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.types)
  useEffect(() => {
    dispatch(getTypes());

  }, []);

  const [form, setFrom] = useState({
    name: "",
    image: "",
    life: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    type1: "",
    type2: ""
  })


  const [error, setError] = useState({
    name: "",
    image: "",
    life: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    type1: "",
    type2: ""
  })

  const changeHanlder = (event) => {
    const property = event.target.name
    const value = event.target.value
    setFrom({ ...form, [property]: value })
  }


  const validateName = (name) => {
    const regex = /^[a-zA-Z]+$/; // Expresión regular que solo permite letras
    if (name.trim() === "") {
      setError({ ...error, name: "Debes ingrear un nombre" })
    } else if (!regex.test(name)) {
      setError({ ...error, name: "El nombre es inválido. Solo se permiten letras." })
    } else {
      setError({ ...error, name: "" })
    }
  };

  const validateImage = (image) => {
    const regex = /^https?:\/\/(?:www\.)?\S+\.(?:jpg|jpeg|gif|png)$/
    return image.trim() !== "" && regex.test(image);

  }

  const validateNumber = (number, field) => {
    const num = Math.floor(number);
    const errorMessage = `El campo ${field} debe ser un número entre 1 y 100`;
    return Number.isInteger(num) && num >= 1 && num <= 100
      ? ""
      : errorMessage;
  };

  const validateForm = () => {
    for (const key in form) {
      if (form[key].trim() === "") {
        return false;
      }
    }
    return true;
  }; 


  const submitHandler = (e) => {
    e.preventDefault();

    const error = {
      name: validateName(form.name),
      image: validateImage(form.image),
      life: validateNumber(form.life, "vida"),
      attack: validateNumber(form.attack, "ataque"),
      defense: validateNumber(form.defense, "defensa"),
      speed: validateNumber(form.speed, "velocidad"),
      height: validateNumber(form.height, "altura"),
      weight: validateNumber(form.weight, "peso"),
    };
  
    if (Object.values(error).some((e) => e !== "")) {
      setError(error);
      return;
    }

    axios
      .post("http://localhost:3001/pokemons", form)
      .then((res) => alert("Pokemon has been created"))
      .catch((err) => alert(err));

  };


  return (
    <form onSubmit={submitHandler}>
      <div>
        <label>Nombre</label>
        <input type="text" value={form.name} onChange={(event) => { changeHanlder(event); validateName(event.target.value) }}
          name="name"
        />
        <p>{error.name}</p>

      </div>
      <div>
        <label>Imagen</label>
        <input 
  type="text" 
  value={form.image} 
  onChange={(event) => { 
    changeHanlder(event);
    if (validateImage(event.target.value)) {
      setError({ ...error, image: "" });
    } else {
      setError({ ...error, image: "El link de la imagen es inválido" });
    }
  }} 
  name="image"
/>
<p>{error.image}</p>

      </div>
      <div>
        <label>Vida</label>
        <input type="number" value={form.life} onChange={changeHanlder} name="life" />
        <p>{error.life}</p>

      </div>
      <div>
        <label>Ataque</label>
        <input type="number" value={form.attack} onChange={changeHanlder} name="attack" />
        <p>{error.number}</p>

      </div>
      <div>
        <label>Defensa</label>
        <input type="number" value={form.defense} onChange={changeHanlder} name="defense" />
        <p>{error.defense}</p>

      </div>
      <div>
        <label>Velocidad</label>
        <input type="number" value={form.speed} onChange={changeHanlder} name="speed" />
        <p>{error.speed}</p>

      </div>
      <div>
        <label>Altura</label>
        <input type="number" value={form.height} onChange={changeHanlder} name="height" />
        <p>{error.height}</p>

      </div>
      <div>
        <label>Peso</label>
        <input type="number" value={form.weight} onChange={changeHanlder} name="weight" />
        <p>{error.weight}</p>

      </div>
      <div>
        <label>Tipo 1</label>
        <select value={form.type1} onChange={changeHanlder} name="type1">
          <option value="">Selecciona un tipo</option>
          {types.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </select>

      </div>
      <div>
        <label>Tipo 2</label>
        <select value={form.type2} onChange={changeHanlder} name="type2">
          <option value="">Selecciona un tipo</option>
          {types.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <button type='submit'>Crear tu pokemon</button>
    </form>
  )
}
export default Form;