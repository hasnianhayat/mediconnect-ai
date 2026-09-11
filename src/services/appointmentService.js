import { patientAppointments } from '../data/doctors';

// Appointment service stub for the prototype.
export async function getPatientAppointments() {
  return patientAppointments;
}
export async function bookAppointment(payload) {
  return { success: true, token: `#DR-${Date.now().toString().slice(-8)}`, payload };
}
