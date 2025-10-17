const patients = [
  { mrn: 'MRN-001', firstName: 'John', lastName: 'Doe', dob: '1980-03-12', phone: '555-1212', allergies: ['Penicillin'] , encounters: [
    { id: 'enc-1', date: '2025-10-10', provider: 'Dr Jones', note: 'Follow-up for hypertension' }
  ] },
  { mrn: 'MRN-002', firstName: 'Jane', lastName: 'Roe', dob: '1990-07-04', phone: '555-3434', allergies: [], encounters: [] }
]

export const mockApi = {
  getPatients: async () => {
    await new Promise((r) => setTimeout(r, 150))
    return patients
  },
  getPatient: async (mrn) => {
    await new Promise((r) => setTimeout(r, 100))
    return patients.find((p) => p.mrn === mrn)
  },
  addEncounter: async (mrn, encounter) => {
    await new Promise((r) => setTimeout(r, 100))
    const p = patients.find((x) => x.mrn === mrn)
    if (!p) throw new Error('Not found')
    p.encounters.push(encounter)
    return encounter
  },
  // simple appointments sample for calendar demo
  _appointments: [
    { id: 'a1', date: '2025-10-13', time: '09:00', patient: 'John Doe', provider: 'Dr Jones' },
    { id: 'a2', date: '2025-10-14', time: '10:30', patient: 'Jane Roe', provider: 'Dr Jones' },
    { id: 'a3', date: '2025-10-15', time: '11:00', patient: 'John Doe', provider: 'Dr Jones' },
    { id: 'a4', date: '2025-10-16', time: '14:00', patient: 'New Patient', provider: 'Nurse Amy' },
  ],
  getAppointments: async (startDate, endDate) => {
    await new Promise((r) => setTimeout(r, 120))
    // naive filter by date string between start and end (inclusive)
    return mockApi._appointments.filter((a) => a.date >= startDate && a.date <= endDate)
  },
}
