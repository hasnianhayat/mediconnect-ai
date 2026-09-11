import { Route } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout';
import Home from '../pages/public/Home';
import ContactUs from '../pages/public/ContactUs';
import DoctorProfile from '../pages/patient/DoctorProfile';
import FindDoctor from '../pages/patient/FindDoctor';
import BookAppointment from '../pages/patient/BookAppointment';
import PatientLayout from '../layouts/PatientLayout';

export default function PublicRoutes() {
  return (
    <>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/find-doctor" element={<FindDoctor />} />
        <Route path="/doctor-profile/:id" element={<DoctorProfile />} />
        <Route path="/book-appointment/:id" element={<BookAppointment />} />
        <Route path="/ai-assistant-preview" element={<Home />} />
      </Route>
      <Route path="/contact-us" element={<ContactRoute />} />
    </>
  );
}

function ContactRoute() {
  const isPatientAuthenticated = Boolean(localStorage.getItem('mediconnect-session'));
  const Layout = isPatientAuthenticated ? PatientLayout : PublicLayout;
  return <Layout><ContactUs /></Layout>;
}
