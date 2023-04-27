import './App.css';
import { Route, useLocation, useNavigate } from 'react-router-dom';
import Landing from './Components/Pages/Landing';
import Home from './Components/Pages/Home';
import Form from './Components/Pages/Form';
import PokeNav from './Components/Parts/PokeNav';
import Detail from './Components/Pages/Detail';


function App() {
  const location = useLocation(); // obtén la ruta actual
  const showPokeNav = location.pathname !== '/'; // muestra PokeNav solo si la ruta es diferente a '/'


  return (
    <div className="App">
       {showPokeNav && <PokeNav />}
      
        <Route exact path="/" render={()=><Landing/>} />
        <Route path="/home" render={()=><Home/>}/>
        <Route exact path="/form" render={()=><Form/>}/>
        <Route exact path='/detail/:id' render={()=><Detail/>} />
      
    </div>
  );
}

export default App;