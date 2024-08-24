import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomeView from './components/pages/Welcome/Welcome.js';
import Welcome1View from './components/pages/Welcome/Welcome1.js';
import Welcome2View from './components/pages/Welcome/Welcome2.js';
import Welcome3View from './components/pages/Welcome/Welcome3.js';
import SignInView from './components/pages/Auth/SignIn/SignIn.js';
import SignUpView from './components/pages/Auth/SignUp/SignUp.js';
import HomeView from './components/pages/Home/Home.js';
import Layout from './components/pages/Layout/Layout.js';
import AllProjectView from './components/pages/Home/AllProject.js';
import ChatView from './components/pages/Chat/Chat.js';
import ProfileView from './components/pages/Profile/Profile.js';
import ProjectPageView from './components/pages/ProjectPage/ProjectPage.js';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomeView />} />
        <Route path="/Welcome1" element={<Welcome1View />} />
        <Route path="/Welcome2" element={<Welcome2View />} />
        <Route path="/Welcome3" element={<Welcome3View />} />
        <Route path="/SignIn" element={<SignInView />} />
        <Route path="/SignUp" element={<SignUpView />} />
        <Route path="/Home" element={<Layout><HomeView /></Layout>} />
        <Route path="/AllProject" element={<Layout><AllProjectView /></Layout>} />
         <Route path="/Chat" element={<Layout><ChatView /></Layout>} />
        <Route path="/Profile" element={<Layout><ProfileView /></Layout>} />
        <Route path="/ProjectPage" element={<ProjectPageView />} />
      </Routes>
    </Router>
  );
};

export default App;