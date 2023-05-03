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

  const validateForm = () => {
    for (const key in form) {
      if (form[key].trim() === "") {
        return false;
      }
    }
    return true;
  };

  const validateNumber = (number) => {
    const num = Math.floor(number)
    console.log(typeof num);
    return Number.isInteger(num) && num >= 1 && num <= 100;
  };


  const submitHandler = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    if (!validateNumber(form.life)) {
      setError({ ...error, life: "La vida debe ser un número entre 1 y 100" })
      return;
    }

    if (!validateNumber(form.attack)) {
      setError({ ...error, attack: "El ataque debe ser un número entre 1 y 100" })
      return;
    }

    if (!validateNumber(form.defense)) {
      setError({ ...error, defense: "La defensa debe ser un número entre 1 y 100" })
      return;
    }

    if (!validateNumber(form.speed)) {
      setError({ ...error, speed: "La velocidad debe ser un número entre 1 y 100" })
      return;
    }

    if (!validateNumber(form.height)) {
      setError({ ...error, height: "La altura debe ser un número entre 1 y 100" })
      return;
    }

    if (!validateNumber(form.weight)) {
      setError({ ...error, weight: "El peso debe ser un número entre 1 y 100" })
      return;
    }


    axios
      .post("http://localhost:3001/pokemons", form)
      .then((res) => alert("Tu Pokemon ha sido creado "))
      .catch((err) => {
        if (err.response.status == 403) { alert("Este pokemon ya existe, intenta creando uno propio") } else if (err.response.status === 402) {
          alert("Ya se ha creado este pokemon anteriormente,animate a buscar otro nombre")
        }
      });

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
        <input type="text" value={form.image} onChange={(event) => {
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
        <input type="number" value={form.life} onChange={(event) => {
            changeHanlder(event);
            const value = event.target.value;
            if (!validateNumber(value)) {
              setError({ ...error, life: "La vida debe ser un número entre 1 y 100" });
            } else {
              setError({ ...error, life: "" });
            }
          }}name="life"/>
        <p>{error.life}</p>

      </div>
      <div>
        <label>Ataque</label>
        
        <input type="number" value={form.attack} onChange={(event) => {
            changeHanlder(event);
            const value = event.target.value;
            if (!validateNumber(value)) {
              setError({ ...error, attack: "El ataque debe ser un número entre 1 y 100" });
            } else {
              setError({ ...error, attack: "" });
            }
          }}name="attack"/>

        <p>{error.attack}</p>

      </div>
      <div>
        <label>Defensa</label>
        
        <input type="number" value={form.defense} onChange={(event) => {
            changeHanlder(event);
            const value = event.target.value;
            if (!validateNumber(value)) {
              setError({ ...error, defense: "La defensa debe ser un número entre 1 y 100" });
            } else {
              setError({ ...error, defense: "" });
            }
          }}name="defense"/>
        <p>{error.defense}</p>

      </div>
      <div>
        <label>Velocidad</label>
       
        <input type="number" value={form.speed} onChange={(event) => {
            changeHanlder(event);
            const value = event.target.value;
            if (!validateNumber(value)) {
              setError({ ...error, speed: "La velocidad debe ser un número entre 1 y 100" });
            } else {
              setError({ ...error, speed: "" });
            }
          }}name="speed"/>
        <p>{error.speed}</p>

      </div>
      <div>
        <label>Altura</label>
        <input type="number" value={form.height} onChange={(event) => {
            changeHanlder(event);
            const value = event.target.value;
            if (!validateNumber(value)) {
              setError({ ...error, height: "La altura debe ser un número entre 1 y 100" });
            } else {
              setError({ ...error, height: "" });
            }
          }}name="height"/>
        <p>{error.height}</p>

      </div>
      <div>
        <label>Peso</label>
        <input type="number" value={form.weight} onChange={(event) => {
            changeHanlder(event);
            const value = event.target.value;
            if (!validateNumber(value)) {
              setError({ ...error, weight: "La defensa debe ser un número entre 1 y 100" });
            } else {
              setError({ ...error, weight: "" });
            }
          }}name="weight"/>
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