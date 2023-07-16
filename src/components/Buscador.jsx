import "./Buscador.css";
import { ImSearch } from "react-icons/im";
// 3.-Importo el useState
import { useState } from "react";
// 7.-Importo el useNavigate
import { useNavigate } from "react-router-dom";

export const Buscador = () => {
  // 4.-Manejamos el estado del input
  const [searchText, setSearchText] = useState('') // Estado inicial vacio

  // 8.-Utilizo la variable Navigate
  const navigate = useNavigate()

  // 1.-Realizar la funcion que se ejecuta con el submit del buscador (button)
  // Funcion que maneja el submit del buscador
  const handleSubmit = (e) => {
    // Evita que se recargue la pagina
    e.preventDefault()
    // 9.-Cuando se ejecuta el evento enviamos a la URL lo que se esta buscando
    navigate(`/?search=${searchText}`);
  }
  return(
    // 2.-Agrego la funcion al form 
    <form className="buscadorContainer" onSubmit={handleSubmit} >
      <div className="buscadorBox">
        <input 
        /* 5.-Pasamos un valor */
        value={searchText} 
        /* 6.-Actualizamos el valor */
        onChange={(e)=> setSearchText(e.target.value)} 
        type="text" 
        className="buscadorInput" />
        <button type="submit" className="buscadorBoton"><ImSearch/></button>
      </div>
    </form>
  )
}