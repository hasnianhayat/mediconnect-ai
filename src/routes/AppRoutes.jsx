import { Routes, Route, Navigate } from 'react-router-dom';
import PublicRoutes from './PublicRoutes';
import AuthRoutes from './AuthRoutes';
import PatientRoutes from './PatientRoutes';
import DoctorRoutes from './DoctorRoutes';
import AdminRoutes from './AdminRoutes';

export default function AppRoutes() {
  return (
    <Routes>
      {PublicRoutes()}
      {AuthRoutes()}
      {PatientRoutes()}
      {DoctorRoutes()}
      {AdminRoutes()}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
