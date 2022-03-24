import React from 'react';
import { Route } from 'react-router-dom';
import Appointment from '../../pages/Appointment/Appointment';
import Dashboard from '../../pages/Dashboard/PatientDashboard';
import Profile from '../../pages/Profile/PatientProfile';

const ClientRoutes = (
    <Route path="patient">
        <Route path="dashboard" element={ <Dashboard/> } />
        <Route path="profile" element={ <Profile/> } />
        <Route path="create-appointment" element={ <Appointment/> } />
    </Route>
)

export default ClientRoutes; 