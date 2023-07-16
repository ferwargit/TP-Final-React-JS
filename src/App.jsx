import { LandingPage } from "./pages/LandingPage"
// import { PeliculasGrid } from './components/PeliculasGrid';
// Ahora importo DetallePelicula.jsx
import { DetallePelicula } from './pages/DetallePelicula';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <BrowserRouter>
        <header>
          <Link to="/"><h1 className="title">Películas</h1></Link>
        </header>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          {/* Creo la ruta para que me muestre la pelicula */}
          {/* <Route path="/pelicula/:peliculaId" element="Detalle de pelicula"></Route> */}
          {/* Ahora le paso el componente que quiero que se muestre */}
          {/* El nombre peliculaId tiene que ser el mismo de la variable (useParams) */}
          {/* que cree en DetallePelicula.jsx */}
          {/* Los dos : apuntan a peliculaID */}
          <Route path="/pelicula/:peliculaId" element={<DetallePelicula />}></Route>
        </Routes>
    </BrowserRouter>
    
  );
}

export default App;
