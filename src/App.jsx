import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import UserProvider, { useUserContext } from './context/UserContext';
import MainLayout from './components/MainLayout';
import Login from './pages/Login';
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
import MomentosEspeciales from './pages/MomentosEspeciales';
import Timing from './pages/Timing';
import Checklist from './pages/Checklist';
import AyudaCeremonia from './pages/AyudaCeremonia';

function ProtectedRoute() {
  const { isAuthenticated } = useUserContext();
  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
}


function App() {


  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
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
              <Route path="momentos-especiales" element={<MomentosEspeciales />} />
              <Route path="timing" element={<Timing />} />
              <Route path="checklist" element={<Checklist />} />
              <Route path="ayuda-ceremonia" element={<AyudaCeremonia />} />
              
              <Route path="more" element={<More />}>
  <Route index element={<p>Selecciona una sección</p>} />







  
  <Route path="perfil" element={<Perfil />} />
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
