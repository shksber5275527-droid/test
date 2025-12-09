import {  Navigate, Route, Routes } from "react-router";
import Registerform from "./components/userForm/Registerform";
import Loginform from "./components/userForm/Loginform";
import ProtectedRoutes from "./utils/Protectedroutes";
import Home from "./components/userForm/Home";
function App() {
  return (
    <>

        <Routes>
          <Route path="/register" element={<Registerform />} />
          <Route path="/login" element={<Loginform />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="home" element={<Home />} />
          </Route>
            <Route path="*" element={<Navigate to='/login' replace />} />
        </Routes>
    </>
  );
}

export default App;
