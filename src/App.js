// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomeView from './components/pages/Welcome/Welcome.js';
import Welcome1View from './components/pages/Welcome/Welcome1.js';
import Welcome2View from './components/pages/Welcome/Welcome2.js';
import Welcome3View from './components/pages/Welcome/Welcome3.js';
import SignInView from './components/pages/Auth/SignIn/SignIn.js';
//import OtherComponent from './OtherComponent'; // Otros componentes si los tienes

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomeView />} />
        <Route path="/Welcome1" element={<Welcome1View />} />
        <Route path="/Welcome2" element={<Welcome2View />} />
        <Route path="/Welcome3" element={<Welcome3View />} />
        <Route path="/SignIn" element={<SignInView />} />
      </Routes>
    </Router>
  );
};

export default App;
