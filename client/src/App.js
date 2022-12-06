import '../src/css/Header&Footer.css';
import '../src/css/Peeps.css';

import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Footer from './components/Header&Footer/Footer';
import Header from './components/Header&Footer/Header';
import HomePage from './components/HomePage/HomePage';
import LoginPage from './components/Login/LoginPage';

function App() {

  const [user, setUser] = useState({});

  return (
    <main>
      <Header />
      {/* <LoginPage setUser={setUser} /> */}
      <HomePage />
      <Footer />
    </main>
  );
}

export default App;
