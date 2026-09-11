import { doctors } from '../data/doctors';

// Doctor data service stub — reads from local mock data for this prototype.
export async function listDoctors(filters = {}) {
  return doctors.filter((d) => {
    if (filters.city && d.city !== filters.city) return false;
    if (filters.specialty && d.specialty !== filters.specialty) return false;
    return true;
  });
}
export async function getDoctorById(id) {
  return doctors.find((d) => String(d.id) === String(id));
}
