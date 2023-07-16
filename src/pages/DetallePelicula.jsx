// Tengo que importar get() porque voy hacer el llamado a la API
import { get } from "../utils/httpCliente";
// Necesito tambien el useState y el useEffect
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// Importo el componente Spinner
import { Spinner } from "../components/Spinner";

// Importo el css
import "./DetallePelicula.css";


export const DetallePelicula = () => {

  // Tengo que crear un estado para guardar la pelicula
  // que voy a obtener de la API
  const [pelicula, setPelicula] = useState(null)

  // Creo un estado para el spinner
  const [cargando, setCargando] = useState(true)

  // Tengo que tomar el parametro que viaja en la URL (de la ruta
  // donde se esta guardando el componente - del path de Route) 
  // y guardarlo en una vaiable -peliculaID- para poder usarlo en el useEffect
  const {peliculaId = "valorPorDefecto"} = useParams()

  useEffect(() => {
    // Antes de hacer el llamado a la API, pongo el spinner
    setCargando(true)

    // Hago el llamado a la API
    get(`/movie/${peliculaId}`)
      .then((data) => {
        setPelicula(data);
        // Cuando ya tengo la info de la API, saco el spinner
        setCargando(false);
      })
      // Cada vez que cambie peliculaId se ejecuta setPelicula y me trae la info
  },[peliculaId]);

  // Si cargando es true, muestro el spinner
  // Para maquetar if(true).
  if(cargando){
    return < Spinner />
  }

  if(!pelicula){
    return null;
  }

  const imgURL = `https://image.tmdb.org/t/p/w500${pelicula.poster_path}`

  return (
    <div className="contenedorDetalle">
      <img className="col" src={imgURL} alt={pelicula.title} />
      <div className="peliculaDetalle col">
        <p className="item">
          <strong>Titulo: </strong>{pelicula.title}
        </p>
        <p>
          <strong>Descripción: </strong>
          {pelicula.overview}
        </p>
        <p>
        <strong>Generos: </strong>
        {pelicula.genres.map((genre)=>genre.name).join(" , ")}.
        </p>
        <p><strong>Idioma original: </strong>{pelicula.original_language}</p>
        <p><strong>Fecha de lanzamiento: </strong>{pelicula.release_date}</p>
        <p><strong>Rating: </strong>{pelicula.vote_average}</p>
        <p><strong>Popularidad: </strong>{pelicula.popularity}</p>
      </div>
    </div>
  );
}