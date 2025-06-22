import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserProvider, { useUserContext } from './context/UserContext';
import MainLayout from './components/MainLayout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Tasks from './pages/Tasks';
import Finance from './pages/Finance';
import More from './pages/More';
import Invitados from './pages/Invitados';
import Proveedores from './pages/Proveedores';

import Perfil from './pages/Perfil';
import SeatingPlan from './pages/SeatingPlan';
import Invitaciones from './pages/Invitaciones';
import Contratos from './pages/Contratos';
import ProtocoloLayout from './pages/protocolo/ProtocoloLayout';
import MomentosEspeciales from './pages/protocolo/MomentosEspeciales';
import Timing from './pages/protocolo/Timing';
import Checklist from './pages/protocolo/Checklist';
import AyudaCeremonia from './pages/protocolo/AyudaCeremonia';
import DisenoWeb from './pages/DisenoWeb';
import Ideas from './pages/Ideas';

function ProtectedRoute() {
  const { isAuthenticated } = useUserContext();
  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
}


function App() {
  return (
    <UserProvider>
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={process.env.NODE_ENV === 'development' ? <Navigate to="/home" replace /> : <Login />} />
            <Route path="/signup" element={<Signup />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>
              <Route path="home" element={<Home />} />
              <Route path="tasks" element={<Tasks />} />
              <Route path="finance" element={<Finance />} />
              <Route path="invitados" element={<Invitados />} />
              <Route path="invitados/seating" element={<SeatingPlan />} />
              <Route path="invitados/invitaciones" element={<Invitaciones />} />
              <Route path="proveedores" element={<Proveedores />} />
              <Route path="proveedores/contratos" element={<Contratos />} />
              {/* Rutas de Protocolo */}
              <Route path="protocolo" element={<ProtocoloLayout />}>
                <Route index element={<Navigate to="momentos-especiales" replace />} />
                <Route path="momentos-especiales" element={<MomentosEspeciales />} />
                <Route path="timing" element={<Timing />} />
                <Route path="checklist" element={<Checklist />} />
                <Route path="ayuda-ceremonia" element={<AyudaCeremonia />} />
              </Route>
              <Route path="perfil" element={<Perfil />} />
               <Route path="diseno-web" element={<DisenoWeb />} />
               <Route path="ideas" element={<Ideas />} />
              <Route path="more" element={<More />}>
                <Route index element={<p>Selecciona una sección</p>} />
              </Route>




  
  
              <Route path="*" element={<Navigate to="home" replace />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
