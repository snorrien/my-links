import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './components/MainPage/MainPage';
import LinksPage from './components/Links/LinksPage/LinksPage';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes >
          <Route path='/' element={<MainPage />} />
          <Route path='/card' element={<LinksPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
