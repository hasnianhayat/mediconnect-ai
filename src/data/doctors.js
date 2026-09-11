export const specialties = [
  'Cardiologist',
  'Dermatologist',
  'Neurologist',
  'Pediatrician',
  'Orthopedic',
  'Gynecologist',
  'ENT Specialist',
  'Psychiatrist',
  'General Physician',
  'Dentist',
  'Ophthalmologist',
  'Endocrinologist',
];

export const regions = ['Punjab', 'Sindh', 'KPK', 'Balochistan'];
export const cities = ['Lahore', 'Karachi', 'Islamabad', 'Peshawar', 'Quetta', 'Multan', 'Faisalabad'];

export const doctors = [
  { id: 1, name: 'Dr. Ali Raza', specialty: 'Cardiologist', city: 'Lahore', region: 'Punjab', rating: 4.9, reviews: 128, fee: 1500, experience: '8+ Years', qualification: 'MBBS, FCPS (Cardiology)', image: '/images/image.png' },
  { id: 2, name: 'Dr. Sara Khan', specialty: 'Dermatologist', city: 'Karachi', region: 'Punjab', rating: 4.8, reviews: 96, fee: 1200, experience: '6 Years', qualification: 'MBBS, FCPS (Dermatology)', image: '/images/fimage.png' },
  { id: 3, name: 'Dr. Usman Ahmed', specialty: 'Neurologist', city: 'Karachi', region: 'Sindh', rating: 4.9, reviews: 74, fee: 2000, experience: '10 Years', qualification: 'MBBS, FCPS (Neurology)', image: '/images/image.png' },
  { id: 4, name: 'Dr. Ayesha Malik', specialty: 'Pediatrician', city: 'Karachi', region: 'Sindh', rating: 4.8, reviews: 152, fee: 1000, experience: '7 Years', qualification: 'MBBS, FCPS (Paediatrics)', image: '/images/fimage.png' },
  { id: 5, name: 'Dr. Hamza Tariq', specialty: 'Orthopedic', city: 'Karachi', region: 'Sindh', rating: 4.8, reviews: 61, fee: 1800, experience: '9 Years', qualification: 'MBBS, FCPS (Orthopedics)', image: '/images/image.png' },
  { id: 6, name: 'Dr. Fatima Noor', specialty: 'Gynecologist', city: 'Karachi', region: 'Sindh', rating: 4.9, reviews: 110, fee: 1500, experience: '8 Years', qualification: 'MBBS, FCPS (Gynecology)', image: '/images/fimage.png' },
  { id: 7, name: 'Dr. Bilal Ahmed', specialty: 'ENT Specialist', city: 'Karachi', region: 'Sindh', rating: 4.8, reviews: 95, fee: 1300, experience: '7 Years', qualification: 'MBBS, FCPS (ENT)', image: '/images/image.png' },
  { id: 8, name: 'Dr. Hina Shah', specialty: 'Psychiatrist', city: 'Karachi', region: 'Sindh', rating: 4.9, reviews: 84, fee: 2500, experience: '8 Years', qualification: 'MBBS, FCPS (Psychiatry)', image: '/images/fimage.png' },
  { id: 9, name: 'Dr. Imran Qureshi', specialty: 'General Physician', city: 'Karachi', region: 'Sindh', rating: 4.8, reviews: 203, fee: 800, experience: '12 Years', qualification: 'MBBS', image: '/images/image.png' },
  { id: 10, name: 'Dr. Muneeba Khan', specialty: 'Dentist', city: 'Karachi', region: 'Sindh', rating: 4.9, reviews: 67, fee: 1000, experience: '5 Years', qualification: 'BDS', image: '/images/fimage.png' },
  { id: 11, name: 'Dr. Zain Abbas', specialty: 'Ophthalmologist', city: 'Karachi', region: 'Sindh', rating: 4.9, reviews: 45, fee: 1400, experience: '6 Years', qualification: 'MBBS, FCPS (Ophthal)', image: '/images/image.png' },
  { id: 12, name: 'Dr. Sana Ullah', specialty: 'Endocrinologist', city: 'Karachi', region: 'Sindh', rating: 4.8, reviews: 39, fee: 1900, experience: '9 Years', qualification: 'MBBS, FCPS (Endo)', image: '/images/fimage.png' },
  { id: 13, name: 'Dr. Waqas Ahmed', specialty: 'Cardiologist', city: 'Islamabad', region: 'KPK', rating: 4.7, reviews: 88, fee: 1700, experience: '9 Years', qualification: 'MBBS, FCPS (Cardiology)', image: '/images/image.png' },
  { id: 14, name: 'Dr. Areeba Iqbal', specialty: 'Dermatologist', city: 'Lahore', region: 'Punjab', rating: 4.8, reviews: 118, fee: 1300, experience: '7 Years', qualification: 'MBBS, FCPS (Dermatology)', image: '/images/fimage.png' },
  { id: 15, name: 'Dr. Noman Riaz', specialty: 'Neurologist', city: 'Islamabad', region: 'KPK', rating: 4.9, reviews: 92, fee: 2200, experience: '11 Years', qualification: 'MBBS, FCPS (Neurology)', image: '/images/image.png' },
  { id: 16, name: 'Dr. Hania Arif', specialty: 'Pediatrician', city: 'Lahore', region: 'Punjab', rating: 4.7, reviews: 141, fee: 1100, experience: '8 Years', qualification: 'MBBS, FCPS (Paediatrics)', image: '/images/fimage.png' },
  { id: 17, name: 'Dr. Fahad Malik', specialty: 'Orthopedic', city: 'Multan', region: 'Punjab', rating: 4.8, reviews: 73, fee: 1800, experience: '10 Years', qualification: 'MBBS, FCPS (Orthopedics)', image: '/images/image.png' },
  { id: 18, name: 'Dr. Sadaf Noor', specialty: 'Gynecologist', city: 'Islamabad', region: 'KPK', rating: 4.9, reviews: 123, fee: 1600, experience: '9 Years', qualification: 'MBBS, FCPS (Gynecology)', image: '/images/fimage.png' },
  { id: 19, name: 'Dr. Ahmed Tariq', specialty: 'ENT Specialist', city: 'Peshawar', region: 'KPK', rating: 4.8, reviews: 90, fee: 1400, experience: '8 Years', qualification: 'MBBS, FCPS (ENT)', image: '/images/image.png' },
  { id: 20, name: 'Dr. Mariam Hussain', specialty: 'Psychiatrist', city: 'Lahore', region: 'Punjab', rating: 4.9, reviews: 76, fee: 2600, experience: '9 Years', qualification: 'MBBS, FCPS (Psychiatry)', image: '/images/fimage.png' },
  { id: 21, name: 'Dr. Junaid Ali', specialty: 'General Physician', city: 'Faisalabad', region: 'Punjab', rating: 4.7, reviews: 163, fee: 850, experience: '13 Years', qualification: 'MBBS', image: '/images/image.png' },
  { id: 22, name: 'Dr. Eisha Raza', specialty: 'Dentist', city: 'Islamabad', region: 'KPK', rating: 4.8, reviews: 54, fee: 950, experience: '6 Years', qualification: 'BDS', image: '/images/fimage.png' },
  { id: 23, name: 'Dr. Omer Siddiq', specialty: 'Ophthalmologist', city: 'Faisalabad', region: 'Punjab', rating: 4.9, reviews: 60, fee: 1500, experience: '7 Years', qualification: 'MBBS, FCPS (Ophthal)', image: '/images/image.png' },
  { id: 24, name: 'Dr. Rabia Yasmin', specialty: 'Endocrinologist', city: 'Peshawar', region: 'KPK', rating: 4.8, reviews: 41, fee: 1950, experience: '10 Years', qualification: 'MBBS, FCPS (Endo)', image: '/images/fimage.png' },
];

export const featuredDoctor = {
  id: 1,
  name: 'Dr. Ali Raza',
  specialty: 'Cardiologist',
  city: 'Lahore',
  region: 'Punjab',
  rating: 4.0,
  reviews: 128,
  fee: 2000,
  experience: '8+ Years',
  qualification: 'MBBS, FCPS (Cardiology)',
  specialization: 'Interventional Cardiology',
  hospital: 'City Heart Hospital, 123 Medical Street, Gulberg III, Lahore, Punjab, Pakistan',
  email: 'dr.aliraza@mediconnect.ai',
  bio: 'Experienced Cardiologist with over 8 years of experience in diagnosing and treating heart conditions. Committed to providing patient-centered care and improving cardiovascular health.',
  availability: 'Mon to Sat, 10:00 AM – 06:00 PM',
};

export const patientAppointments = {
  upcoming: [
    { doctor: 'Dr. Ali Raza', specialty: 'Cardiologist', date: '25 May 2026', time: '10:30 AM', location: 'Karachi, Sindh', reason: 'Heart Checkup', image: '/images/doctor3.png' },
    { doctor: 'Dr. Sara Khan', specialty: 'Dermatologist', date: '28 May 2026', time: '02:00 PM', location: 'Lahore, Punjab', reason: 'Skin Consultation', image: '/images/doctor5.png' },
  ],
  pending: [
    { doctor: 'Dr. Usman Ahmed', specialty: 'Neurologist', date: '30 May 2026', time: '11:00 AM', location: 'Islamabad, ICT', reason: 'Headache & Dizziness' },
  ],
  history: [
    { doctor: 'Dr. Hina Shah', specialty: 'Psychiatrist', date: '10 May 2026', time: '03:00 PM', location: 'Karachi, Sindh', reason: 'Stress & Anxiety' },
    { doctor: 'Dr. Bilal Ahmed', specialty: 'ENT Specialist', date: '01 May 2026', time: '11:30 AM', location: 'Lahore, Punjab', reason: 'Throat Infection' },
    { doctor: 'Dr. Fatima Noor', specialty: 'Gynecologist', date: '20 Apr 2026', time: '01:00 PM', location: 'Islamabad, ICT', reason: 'Routine Checkup' },
  ],
};

export const doctorAppointmentQueue = [
  { patient: 'Ali Raza', mrn: 'MRN: 1023', date: 'Oct 25, 2024', time: '09:00 AM', reason: 'Consultation', status: 'Completed' },
  { patient: 'Sara Khan', mrn: 'MRN: 1024', date: 'Oct 25, 2024', time: '10:00 AM', reason: 'Follow-up', status: 'Completed' },
  { patient: 'Ahmed Javed', mrn: 'MRN: 1025', date: 'Oct 25, 2024', time: '11:00 AM', reason: 'Consultation', status: 'Completed' },
  { patient: 'Fatima Noor', mrn: 'MRN: 1026', date: 'Oct 25, 2024', time: '12:00 PM', reason: 'Consultation', status: 'Completed' },
  { patient: 'Usman Sheikh', mrn: 'MRN: 1027', date: 'Oct 25, 2024', time: '09:00 AM', reason: 'Consultation', status: 'Pending' },
];

export const doctorPatients = [
  { name: 'Ali Raza', mrn: 'MRN: 1023', lastVisit: 'Oct 25, 2024 · 09:00 AM', reason: 'Consultation', type: 'In-Person', status: 'Completed' },
  { name: 'Sara Khan', mrn: 'MRN: 1024', lastVisit: 'Oct 25, 2024 · 10:00 AM', reason: 'Follow-up', type: 'In-Person', status: 'Completed' },
  { name: 'Ahmed Javed', mrn: 'MRN: 1025', lastVisit: 'Oct 25, 2024 · 11:00 AM', reason: 'Consultation', type: 'Video Call', status: 'Completed' },
  { name: 'Fatima Noor', mrn: 'MRN: 1026', lastVisit: 'Oct 25, 2024 · 12:00 PM', reason: 'Consultation', type: 'In-Person', status: 'Completed' },
  { name: 'Bilal Ahmed', mrn: 'MRN: 1028', lastVisit: 'Oct 24, 2024 · 02:00 PM', reason: 'X-Ray Review', type: 'In-Person', status: 'Completed' },
  { name: 'Usman Sheikh', mrn: 'MRN: 1027', lastVisit: 'Oct 26, 2024 · 09:00 AM', reason: 'Consultation', type: 'In-Person', status: 'Pending' },
  { name: 'Hina Mughal', mrn: 'MRN: 1030', lastVisit: 'Oct 26, 2024 · 11:30 AM', reason: 'Follow-up', type: 'In-Person', status: 'Pending' },
  { name: 'Hassan Ali', mrn: 'MRN: 1033', lastVisit: 'Oct 23, 2024 · 10:00 AM', reason: 'Consultation', type: 'In-Person', status: 'Cancelled' },
];

export const adminDoctors = [
  { name: 'Dr. Sara Khan', mrn: 'MRN: 1023', specialty: 'General Physician', city: 'Lahore', region: 'Punjab', experience: '8 Years', fee: 1000, status: 'Active' },
  { name: 'Dr. Waqas Ahmed', mrn: 'MRN: 1024', specialty: 'Cardiologist', city: 'Karachi', region: 'Sindh', experience: '12 Years', fee: 1500, status: 'Active' },
  { name: 'Dr. Ayesha Malik', mrn: 'MRN: 1025', specialty: 'Dermatologist', city: 'Islamabad', region: 'KPK', experience: '10 Years', fee: 1200, status: 'Active' },
  { name: 'Dr. Usman Tariq', mrn: 'MRN: 1026', specialty: 'Orthopedic', city: 'Lahore', region: 'Punjab', experience: '9 Years', fee: 1300, status: 'Pending Queue' },
  { name: 'Dr. Fatima Rizvi', mrn: 'MRN: 1027', specialty: 'Gynecologist', city: 'Faisalabad', region: 'Punjab', experience: '7 Years', fee: 1000, status: 'Active' },
  { name: 'Dr. Ali Raza', mrn: 'MRN: 1028', specialty: 'Lab Specialist', city: 'Multan', region: 'Punjab', experience: '6 Years', fee: 800, status: 'Active' },
];

export const adminPatients = [
  { name: 'Sara Khan', mrn: 'MRN: 1001', father: 'Ahmed Khan', phone: '+92 300 1234567', age: 28, email: 'sara.khan@gmail.com', region: 'Punjab', city: 'Lahore', status: 'Active' },
  { name: 'Ali Raza', mrn: 'MRN: 1002', father: 'Riaz Ahmed', phone: '+92 301 2345678', age: 42, email: 'ali.raza@gmail.com', region: 'Sindh', city: 'Karachi', status: 'Active' },
  { name: 'Ayesha Malik', mrn: 'MRN: 1003', father: 'Malik Naeem', phone: '+92 302 3456789', age: 35, email: 'ayesha.malik@gmail.com', region: 'KPK', city: 'Peshawar', status: 'Active' },
  { name: 'Usman Tariq', mrn: 'MRN: 1004', father: 'Tariq Mehmood', phone: '+92 303 4567890', age: 50, email: 'usman.tariq@gmail.com', region: 'Balochistan', city: 'Quetta', status: 'Active' },
  { name: 'Fatima Rizvi', mrn: 'MRN: 1005', father: 'Shahid Rizvi', phone: '+92 304 5678901', age: 27, email: 'fatima.rizvi@gmail.com', region: 'Punjab', city: 'Multan', status: 'Active' },
];

export const pendingDoctorQueue = [
  { name: 'Dr. Sara Khan', mrn: 'MRN: 1023', specialty: 'Cardiologist', region: 'Punjab', city: 'Lahore', hospital: 'Jinnah Hospital', fee: 1000, phone: '+92 301 1234567' },
  { name: 'Dr. Waqas Ahmed', mrn: 'MRN: 1024', specialty: 'Orthopedic', region: 'Sindh', city: 'Karachi', hospital: 'South City Hospital', fee: 1500, phone: '+92 302 2345678' },
  { name: 'Dr. Ayesha Malik', mrn: 'MRN: 1025', specialty: 'Dermatologist', region: 'KPK', city: 'Peshawar', hospital: 'Khyber Medical Hospital', fee: 1200, phone: '+92 303 3456789' },
  { name: 'Dr. Usman Tariq', mrn: 'MRN: 1026', specialty: 'Orthopedic', region: 'Balochistan', city: 'Quetta', hospital: 'Bolan Medical Center', fee: 1300, phone: '+92 304 4567890' },
];

export const openComplaints = [
  { sender: 'Dr. Ali Raza', role: 'Doctor', email: 'ali.raza@gmail.com', subject: 'Appointment booking issue', date: '25 May 2026', time: '10:30 AM' },
  { sender: 'Sara Khan', role: 'Patient', email: 'sara.khan@gmail.com', subject: 'Unable to login to account', date: '25 May 2026', time: '09:15 AM' },
  { sender: 'Dr. Usman Tariq', role: 'Doctor', email: 'usman.tariq@gmail.com', subject: 'Profile approval pending', date: '25 May 2026', time: '04:20 PM' },
  { sender: 'Ayesha Malik', role: 'Patient', email: 'ayesha.malik@gmail.com', subject: 'Report upload problem', date: '24 May 2026', time: '01:05 PM' },
];
