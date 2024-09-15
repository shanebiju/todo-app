import Homepage from "./pages/homepage/homepage"
import Login from "./pages/auth/login"
import Signup from "./pages/auth/signup"
import AllTasks from "./pages/AllTasks"
import CompletedTasks from "./pages/CompletedTasks"
import IncompleteTasks from "./pages/IncompleteTasks"
import ImportantTasks from "./pages/ImportantTasks"
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom"
import AuthContextProvider from "./context/AuthContext"
import { useAuthContext } from "./hooks/useAuthContext"
import { useEffect } from "react"

const ProtectedRoute = ({ children }) => {
  const { user } = useAuthContext()
  const navigate=useNavigate();
  useEffect(() => {
    if (!user) {
      console.log('app jsx');
      
      navigate('/login',{replace:true})
    }
  }, [user])

  return children;
};

const App = () => {
  return (
    <AuthContextProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Homepage />
              </ProtectedRoute>
            }
          >
            <Route index element={<AllTasks />} />
            <Route path="tasks/completed" element={<CompletedTasks />} />
            <Route path="tasks/incomplete" element={<IncompleteTasks />} />
            <Route path="tasks/important" element={<ImportantTasks />} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </AuthContextProvider>
  );
};

export default App;