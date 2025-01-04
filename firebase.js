// src/firebase.js
// import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "XXXXX",
    authDomain: "XXXXXX.firebaseapp.com",
    projectId: "XXXXXXX",
    storageBucket: "XXXXXXX.firebasestorage.app",
    messagingSenderId: "XXXXX",
    appId: "1:XXXXXXX:web:XXXXXXX",
    measurementId: "XX-XXXXXXXX"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// src/components/Login.js
import React from 'react';
import { auth } from '../firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Welcome</h2>
        <button
          onClick={handleGoogleSignIn}
          className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50"
        >
          <img
            src="https://www.google.com/favicon.ico"
            alt="Google"
            className="w-4 h-4"
          />
          Sign in with Google
        </button>
      </div>
    </div>
  );
}

// src/components/Dashboard.js
import React from 'react';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const user = auth.currentUser;

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <img
          src={user?.photoURL}
          alt="Profile"
          className="w-16 h-16 rounded-full mx-auto mb-4"
        />
        <h2 className="text-xl font-bold text-center mb-2">
          Welcome, {user?.displayName}
        </h2>
        <p className="text-center text-gray-600 mb-4">{user?.email}</p>
        <button
          onClick={handleSignOut}
          className="w-full bg-red-500 text-white rounded-lg px-4 py-2 hover:bg-red-600"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}

// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { auth } from './firebase';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function PrivateRoute({ children }) {
  return auth.currentUser ? children : <Navigate to="/" />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
