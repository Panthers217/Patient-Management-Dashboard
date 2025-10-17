const users = [
  { id: 1, email: 'admin@clinic.test', name: 'Admin', role: 'admin' },
  { id: 2, email: 'dr.jones@clinic.test', name: 'Dr Jones', role: 'doctor' },
  { id: 3, email: 'nurse.amy@clinic.test', name: 'Nurse Amy', role: 'nurse' },
  { id: 4, email: 'front.desk@clinic.test', name: 'Front Desk', role: 'staff' },
]

export const fakeAuth = {
  login: async (email, password) => {
    // very simple mock: password must be 'password'
    await new Promise((r) => setTimeout(r, 400))
    const u = users.find((x) => x.email === email)
    if (!u || password !== 'password') throw new Error('Invalid credentials')
    // mock token
    return { ...u, token: 'mock-jwt.' + btoa(JSON.stringify({ id: u.id, role: u.role })) }
  },
  logout: () => {},
}
