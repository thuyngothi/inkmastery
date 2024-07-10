import { Routes, Route } from 'react-router-dom';

import './App.scss';
import Login from './components/login/Login';
import Home from './components/homePage/Home.js';
import Register from './components/register/Register.js';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
