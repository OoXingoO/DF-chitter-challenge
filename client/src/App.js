import '../src/css/Header&Footer.css';
import '../src/css/Peeps.css';
import '../src/css/Login&Register.css';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Footer from './components/Header&Footer/Footer';
import Header from './components/Header&Footer/Header';
import LoginPage from './components/Login/LoginPage';
import Register from './components/Register/Register';
import PostPeep from './components/Peeps/PostPeep';
import AllPeeps from './components/Peeps/AllPeeps';

function App() {

  const [user, setUser] = useState({});
  const logOut = () => setUser({})

  const [peepData, setPeepData] = useState([]);
  const [getError, setGetError] = useState();
  const [postError, setPostError] = useState(``);

  const getPeepData = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/peeps`);
      setPeepData(res.data);
    } catch (error) {
      setGetError(error.message)
    }
  }

  useEffect(() => {
    getPeepData();
  }, []);

  return (
    <main>
      <Header user={user} logOut={logOut} />
      <Router>
        <Routes>
          <Route path="/" element={user && user._id ?
            <>
              <PostPeep user={user} getPeepData={getPeepData} />
              <AllPeeps peepData={peepData} />
            </>
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
