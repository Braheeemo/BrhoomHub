import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import WaitingApproval from './components/Auth/WaitingApproval';
import AdminDashboard from './pages/AdminDashboard';
import GrammarHub from './pages/GrammarHub'; // Added import
import CourseCatalog from './components/Course/CourseCatalog';
// import QuizSection from './components/Quiz/QuizSection'; // REMOVED: Module not found
import GrammarQuizPage from './components/Quiz/GrammarQuizPage'; // Import for the new grammar quiz page
import ProgressTracking from './components/Progress/ProgressTracking';
import Watermark from './components/Watermark';
import './styles.css';
import { auth, db } from './services/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        const userDocRef = doc(db, 'users', user.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          setUserData(userDocSnap.data());
        } else {
          // Default to non-approved, non-admin if Firestore data is missing
          setUserData({ isApproved: false, isAdmin: false });
        }
      } else {
        setCurrentUser(null);
        setUserData(null);
      }
      setIsLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return <div>Loading application...</div>;
  }

  const isLoggedIn = !!currentUser;
  const isAdmin = isLoggedIn && !!userData?.isAdmin;
  const isApproved = isLoggedIn && !!userData?.isApproved;

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            !isLoggedIn ? (
              <Login />
            ) : isAdmin ? (
              <Navigate to="/admin" />
            ) : isApproved ? (
              <Navigate to="/grammar-hub" /> // Changed to grammar-hub
            ) : (
              <Navigate to="/waiting-approval" />
            )
          }
        />
        <Route
          path="/signup"
          element={
            !isLoggedIn ? (
              <Signup />
            ) : isAdmin ? (
              <Navigate to="/admin" />
            ) : isApproved ? (
              <Navigate to="/grammar-hub" /> // Changed to grammar-hub
            ) : (
              <Navigate to="/waiting-approval" />
            )
          }
        />
        <Route
          path="/waiting-approval"
          element={
            isLoggedIn && !isApproved ? (
              <WaitingApproval />
            ) : isAdmin ? (
              <Navigate to="/admin" />
            ) : isApproved ? (
              <Navigate to="/grammar-hub" /> // Changed to grammar-hub
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/admin"
          element={
            isAdmin ? (
              <AdminDashboard />
            ) : isApproved ? (
              <Navigate to="/grammar-hub" /> // Changed to grammar-hub
            ) : isLoggedIn ? (
              <Navigate to="/waiting-approval" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/grammar-hub"
          element={
            isLoggedIn && isApproved ? (
              <GrammarHub />
            ) : isLoggedIn ? (
              <Navigate to="/waiting-approval" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/courses" // CourseCatalog route remains, but is no longer the default
          element={
            isLoggedIn && isApproved ? (
              <CourseCatalog />
            ) : isLoggedIn ? (
              <Navigate to="/waiting-approval" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/quiz/grammar/:sectionId" // New dynamic route for grammar quizzes
          element={
            isLoggedIn && isApproved ? (
              <GrammarQuizPage />
            ) : isLoggedIn ? (
              <Navigate to="/waiting-approval" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        {/* REMOVED Route for /quiz/:courseId as QuizSection.js does not exist
        <Route
          path="/quiz/:courseId"
          element={
            isLoggedIn && isApproved ? (
              <QuizSection />
            ) : isLoggedIn ? (
              <Navigate to="/waiting-approval" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        */}
        <Route
          path="/progress"
          element={
            isLoggedIn && isApproved ? (
              <ProgressTracking />
            ) : isLoggedIn ? (
              <Navigate to="/waiting-approval" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/"
          element={
            isAdmin ? (
              <Navigate to="/admin" />
            ) : isLoggedIn && isApproved ? (
              <Navigate to="/grammar-hub" /> // Changed to grammar-hub
            ) : isLoggedIn && !isApproved ? (
              <Navigate to="/waiting-approval" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
      <Watermark />
    </BrowserRouter>
  );
};

export default App;