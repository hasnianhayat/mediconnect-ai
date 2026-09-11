import { Route } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import Login from '../pages/admin/Login';
import Dashboard from '../pages/admin/Dashboard';
import ManageDoctors from '../pages/admin/ManageDoctors';
import ManagePatients from '../pages/admin/ManagePatients';
import ManageAppointments from '../pages/admin/ManageAppointments';
import PendingDoctorQueue from '../pages/admin/PendingDoctorQueue';
import OpenComplaints from '../pages/admin/OpenComplaints';
import Reports from '../pages/admin/Reports';
import SiteSettings from '../pages/admin/SiteSettings';

export default function AdminRoutes() {
  return (
    <>
      <Route path="/admin/login" element={<Login />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="manage-doctors" element={<ManageDoctors />} />
        <Route path="manage-patients" element={<ManagePatients />} />
        <Route path="manage-appointments" element={<ManageAppointments />} />
        <Route path="pending-doctors" element={<PendingDoctorQueue />} />
        <Route path="complaints" element={<OpenComplaints />} />
        <Route path="reports" element={<Reports />} />
        <Route path="settings" element={<SiteSettings />} />
      </Route>
    </>
  );
}
