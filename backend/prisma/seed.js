import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const bcrypt = require('bcryptjs')
  const pwHash = bcrypt.hashSync('password', 8)
  // seed admin + clinicians + front desk
  const users = [
    { email: 'admin@clinic.test', name: 'Admin', role: 'admin' },
    { email: 'dr.jones@clinic.test', name: 'Dr Jones', role: 'doctor' },
    { email: 'nurse.amy@clinic.test', name: 'Nurse Amy', role: 'nurse' },
    { email: 'front.desk@clinic.test', name: 'Front Desk', role: 'staff' },
  ]

  for (const u of users) {
    await prisma.user.upsert({
      where: { email: u.email },
      update: { password: pwHash, name: u.name, role: u.role },
      create: { email: u.email, name: u.name, password: pwHash, role: u.role },
    })
  }
  // seed a patient and an encounter
  const patient = await prisma.patient.upsert({
    where: { mrn: 'MRN-001' },
    update: {},
    create: { mrn: 'MRN-001', firstName: 'John', lastName: 'Doe', dob: new Date('1980-03-12') },
  })

  await prisma.encounter.create({ data: { patientId: patient.id, date: new Date('2025-10-10'), provider: 'Dr Jones', note: 'Follow-up for hypertension' } })
  console.log('Seeded')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
