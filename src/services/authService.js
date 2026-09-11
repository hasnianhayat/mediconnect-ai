// Auth service stub for the Mediconnect AI prototype (no real backend wired up yet).
export async function login(email, password) {
  return { token: 'demo-token', user: { email, role: 'patient' } };
}
export async function signupPatient(payload) {
  return { success: true, payload };
}
export async function signupDoctor(payload) {
  return { success: true, payload, status: 'pending' };
}
export async function requestPasswordReset(identifier) {
  return { success: true, identifier };
}
export async function logout() {
  return { success: true };
}
