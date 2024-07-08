import { useState, createContext } from 'react';
import { Routes, Route } from 'react-router-dom';

import NavBar from './components/Navbar/Navbar';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import SignupForm from './components/SignupForm/SignupForm' // import the SignupForm
import SigninForm from './components/SigninForm/SigninForm'
import authService from './services/authService';



export const AuthedUserContext = createContext(null);



//ask about the create context bugs

const App = () => {
  const [user, setUser] = useState(authService.getUser());
  const handleSignout = () => {
    authService.signout()
    setUser(null)
  }

  return (
    <>
     <AuthedUserContext.Provider value={user}>
      <NavBar user={user} handleSignout={handleSignout} />
      <Routes>
        { user ? (
          <Route path="/" element={<Dashboard user={user} />} />
        ) : (
          <Route path="/" element={<Landing />} />
          
        )}

<Route path="/signup" element={<SignupForm setUser={setUser} />} />
<Route path='/signin' element={<SigninForm setUser={setUser} />} />
      </Routes>
      </AuthedUserContext.Provider>
    </>
  );
};

export default App