import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './components/MainPage/MainPage';
import CardPage from './components/Card/CardPage';
import Navbar from './components/Navbar/Navbar';

import { Provider } from 'react-redux'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes >
          <Route path='/' element={<MainPage />} />
          <Route path='/card' element={<CardPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
