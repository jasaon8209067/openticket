import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import News from './pages/News';
import Shows from './pages/Shows';
import Login from './pages/login';
import Privacy from './pages/Privacy';



function App() {
 return (
  <BrowserRouter> 

   <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/news" element={<News />} /> 
    <Route path="/shows" element={<Shows />} />
    <Route path="/login" element={<Login />} />
    <Route path="/privacy" element={<Privacy />} />
    
   </Routes>

  </BrowserRouter>
 );
}

export default App;