import { Route } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import Login from '../pages/auth/Login';
import Signup from '../pages/auth/Signup';
import PatientSignup from '../pages/auth/PatientSignup';
import DoctorSignup from '../pages/auth/DoctorSignup';
import VerificationPending from '../pages/auth/VerificationPending';
import ForgotPassword from '../pages/auth/ForgotPassword';
import ResetPassword from '../pages/auth/ResetPassword';

export default function AuthRoutes() {
  return (
    <Route element={<AuthLayout />}>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signup/patient" element={<PatientSignup />} />
      <Route path="/signup/doctor" element={<DoctorSignup />} />
      <Route path="/verification-pending" element={<VerificationPending />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
    </Route>
  );
}
