import { Route, Routes } from 'react-router-dom'
import './App.css'
import ProyectoAlgoritmica from './views/ProyectoAlgoritmica.jsx'
import MainHome from './views/MainHome.jsx';
import AlgoritmosView from './views/AlgoritmosView.jsx';

function App() {

  return (
    <div className='d-flex flex-column min-vh-100'>
      <Routes>
        <Route path='/' element={<MainHome />} />
        <Route path='/dashboard' element={<ProyectoAlgoritmica />} />
        <Route path='/algoritmospage' element={<AlgoritmosView />} />

      </Routes>
    </div>
  )
}

export default App;
