import '../src/css/Header&Footer.css';
import '../src/css/Peeps.css';
import '../src/css/Login&Register.css';

import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Footer from './components/Header&Footer/Footer';
import Header from './components/Header&Footer/Header';
import HomePage from './components/HomePage/HomePage';
import LoginPage from './components/Login/LoginPage';
import Register from './components/Register/Register';

function App() {

  const [user, setUser] = useState({});
  const logOut = () => setUser({})

  return (
    <main>
      <Header user={user} logOut={logOut} />
      <Router>
        <Routes>
          <Route path="/" element={user && user._id ? <HomePage user={user} setUser={setUser} />
            :
            <LoginPage setUser={setUser} />
          } />
          <Route path="/login" element={
            <LoginPage setUser={setUser} />} />

          <Route path="/register" element={<Register />} />

        </Routes>
      </Router>
      <Footer />
    </main>
  );
}

export default App;
