import { Route } from 'react-router-dom';
import DoctorLayout from '../layouts/DoctorLayout';
import Dashboard from '../pages/doctor/Dashboard';
import ScheduleManager from '../pages/doctor/ScheduleManager';
import Appointments from '../pages/doctor/Appointments';
import PatientsQueue from '../pages/doctor/PatientsQueue';
import Reports from '../pages/doctor/Reports';
import Feedback from '../pages/doctor/Feedback';
import Profile from '../pages/doctor/Profile';
import AIAssistant from '../pages/doctor/AIAssistant';

export default function DoctorRoutes() {
  return (
    <Route path="/doctor" element={<DoctorLayout />}>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="schedule" element={<ScheduleManager />} />
      <Route path="appointments" element={<Appointments />} />
      <Route path="patients" element={<PatientsQueue />} />
      <Route path="reports" element={<Reports />} />
      <Route path="ai-assistant" element={<AIAssistant />} />
      <Route path="feedback" element={<Feedback />} />
      <Route path="profile" element={<Profile />} />
    </Route>
  );
}
