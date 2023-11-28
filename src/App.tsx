import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './components/MainPage/MainPage';
import LinksPage from './components/Links/LinksPage/LinksPage';
import Navigation from './components/Navigation/Navigation';
import ContactPage from './components/ContactPage/ContactPage';


function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Navigation />
        <Routes >
          <Route path='/' element={<MainPage />} />
          <Route path='/contact' element={<ContactPage />} />
          <Route path='/link' element={<LinksPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
