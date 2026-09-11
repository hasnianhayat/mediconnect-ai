import { Route } from 'react-router-dom';
import PatientLayout from '../layouts/PatientLayout';
import Dashboard from '../pages/patient/Dashboard';
import Appointments from '../pages/patient/Appointments';
import FindDoctor from '../pages/patient/FindDoctor';
import BookAppointment from '../pages/patient/BookAppointment';
import AIAssistant from '../pages/patient/AIAssistant';
import Reports from '../pages/patient/Reports';
import HelpSupport from '../pages/patient/HelpSupport';
import Profile from '../pages/patient/Profile';
import BMICalculator from '../pages/patient/BMICalculator';
import DoctorProfile from '../pages/patient/DoctorProfile';
import ContactUs from '../pages/public/ContactUs';
import DoctorFeedback from '../pages/patient/DoctorFeedback';

export default function PatientRoutes() {
  return (
    <Route path="/patient" element={<PatientLayout />}>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="appointments" element={<Appointments />} />
      <Route path="find-doctor" element={<FindDoctor />} />
      <Route path="doctor-profile/:id" element={<DoctorProfile />} />
      <Route path="doctor-profile/:id/feedback" element={<DoctorFeedback />} />
      <Route path="book-appointment/:id" element={<BookAppointment />} />
      <Route path="ai-assistant" element={<AIAssistant />} />
      <Route path="reports" element={<Reports />} />
      <Route path="help-support" element={<HelpSupport />} />
      <Route path="contact-us" element={<ContactUs />} />
      <Route path="profile" element={<Profile />} />
      <Route path="bmi-calculator" element={<BMICalculator />} />
    </Route>
  );
}
