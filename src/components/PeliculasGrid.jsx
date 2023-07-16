// import peliculas from './peliculas.json';
// Ahora tengo que reemplazar el json por la consulta a la API
import { get } from "../utils/httpCliente.js";
// Cada vez que uso una API el useState y el useEffect
import { useState, useEffect } from "react";
import { PeliculasCard } from './PeliculasCard';
import './PeliculasGrid.css';
// Importo el componente Spinner
import { Spinner } from "../components/Spinner";
// 10.-Importamos useLocation
import { useLocation } from "react-router-dom";

export const PeliculasGrid = () => {

  // 12.-Utilizamos este hook para obtener el valor por parametro de la URL
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  }

  // 13.-Guardamos el valor del parametro de la URL en una variable
  const query = useQuery();
  // 14.-Guardo en una variable el valor del parametro de la URL que se esta buscando
  const search = query.get("search");

  // Voy a guardar el json en un estado
  // El estado es un objeto que tiene dos propiedades
  // 1. El valor del estado
  // 2. Una funcion que me permite modificar el valor del estado con la
  //    nueva informacion que me de la API
  // El estado inicial (peliculas) es un array vacio
  const [peliculas, setPeliculas] = useState([]);

  // Creo un estado para el spinner
  const [cargando, setCargando] = useState(true);

  // 11.-Creo una variable para usar el useLocation
  // El useLocation me devuelve un objeto con la info de la URL
  // const location = useLocation();
  // console.log(location);
  // console.log(location.search);

  // Voy a hacer una consulta a la API
  // El useEffect recibe una funcion como parametro
  // La funcion que recibe useEffect recibe como parametro un callback
  // El callback se ejecuta cuando el componente se monta
  useEffect(() => {

    // 15.-Si realizamos un ternario, si hay busqueda visita un endpoint, si no hay busqueda visita otro endpoint
    // Si hay busqueda, visito el endpoint de busqueda
    // Si no hay busqueda, visito el endpoint de peliculas populares
    const searchURL = search ? "/search/movie?query="+search : "/discover/movie"

    // Antes de hacer el llamado a la API, pongo el spinner
    setCargando(true);

    // La funcion get hace una consulta a la API
    // La funcion get recibe como parametro una parte dinámica de la url de la API
    // get('/discover/movie')
    // 16.-Le paso como parametro a la funcion get la variable searchURL
    get(searchURL)
      // Recibo data, que es el json con la info de la consulta que me devuelve la funcion get
      .then((data) => {
        // console.log(data.results);
        // Le paso a setPeliculas el json que me devuelve la API
        setPeliculas(data.results);
        // Cuando ya tengo la info de la API, saco el spinner
        setCargando(false);
      })
    // 14.-Agrego el search como dependencia del useEffect
    // Si el search cambia, se vuelve a ejecutar el useEffect
    // Si el search no cambia, no se vuelve a ejecutar el useEffect
  },[search]);

  // Si cargando es true, muestro el spinner
  // Para maquetar if(true).
  if(cargando){
    return < Spinner />
  }
  
  return(
    <ul className="moviesGrid">

      {/* Aqui voy a iterar sobre el json y voy a crear un componente PeliculasCard por cada pelicula */}
      {/* Para iterar sobre un json uso el metodo map */}
      {/* El metodo map recibe una funcion como parametro */}
      {/* La funcion que recibe map recibe como parametro cada elemento del json */}
      { peliculas.map((pelicula) => (
        // Le paso como parametro a PeliculasCard el json
        <PeliculasCard key={pelicula.id} pelicula={pelicula} />
      ))}

    </ul>
  )
}

// useEffect

// La diferencia entre usar el segundo parámetro del useEffect sin corchetes, con corchetes vacíos y con un array de dependencias.

// El segundo parámetro del useEffect se utiliza para especificar las dependencias que el efecto tiene. Cuando el componente se monta o actualiza, el useEffect se ejecuta siempre que alguna de sus dependencias haya cambiado.

// 1.-Si no se proporciona un segundo parámetro al useEffect, se ejecutará en cada actualización del componente. Es decir, cada vez que el estado o las props del componente cambien, el useEffect se ejecutará.

// 2.-Por otro lado, si se proporciona un array vacío como segundo parámetro ( [] ), el useEffect se ejecutará sólo una vez, cuando el componente se monte. Esto es útil para efectos que sólo necesitan ejecutarse una vez, como por ejemplo para hacer una llamada a una API en la carga inicial del componente.

// 3.-Finalmente, si se proporciona un array con dependencias específicas, el useEffect se ejecutará sólo cuando alguna de las dependencias cambie. En este caso, sólo se ejecutará el efecto cuando sea necesario.