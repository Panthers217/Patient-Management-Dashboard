const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  await prisma.user.upsert({
    where: { email: 'admin@clinic.test' },
    update: {},
    create: { email: 'admin@clinic.test', name: 'Admin', password: 'password', role: 'admin' },
  })
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
