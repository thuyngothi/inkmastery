import { Routes, Route } from 'react-router-dom';
import { createContext, useContext, useState } from 'react';

import './App.scss';
import Login from './components/login/Login';
import Home from './components/homePage/Home.js';
import Register from './components/register/Register.js';
import ForgotPass from './components/forgotPass/ForgotPass.js';
import UpdatePass from './components/forgotPass/UpdatePass.js';
import ProjectProcess from './components/projects/ProjectProcess.js';

const projectContext = createContext()

function App() {
  const [selectedProject, setSelectedProject] = useState(null)

  return (
    <projectContext.Provider value={{selectedProject, setSelectedProject}}>
      <div className="App">
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/forgotPassword' element={<ForgotPass />} />
          <Route path='/updatePassword' element={<UpdatePass />} />
          <Route path='/register' element={<Register />} />
          <Route path='/home/*' element={<Home />} />
          <Route path='/home/projects/project_process' element={<ProjectProcess />} />
        </Routes>
      </div>
    </projectContext.Provider>
  );
}

export const useSelectedProject = () => useContext(projectContext);

export default App;
